import {
  AccountData,
  DirectSignResponse,
  OfflineDirectSigner,
} from '@cosmjs/proto-signing'
import clsx from 'clsx'
import { nanoid } from 'nanoid'
import Image from 'next/image'
import { lazy, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import {
  Button,
  InputLabel,
  InputThemedText,
  Loader,
  RawActionsRendererMessages,
  useActionOptions,
} from '@dao-dao/stateless'
import { AccountType, protobufToCwMsg } from '@dao-dao/types'
import { ActionComponent } from '@dao-dao/types/actions'
import {
  SignDoc,
  TxBody,
} from '@dao-dao/types/protobuf/codegen/cosmos/tx/v1beta1/tx'
import { EMPTY_PUB_KEY, getChainForChainId } from '@dao-dao/utils'

import { SuspenseLoader } from '../../../../components'

export type SkipGoData = {
  chainId: string
  message: string
}

export const SkipGoIcon = () => (
  // eslint-disable-next-line i18next/no-literal-string
  <Image alt="Skip Go" height={32} src="/skipgo.png" width={32} />
)

const LazyWidget = lazy(() =>
  import('@skip-go/widget').then(({ Widget }) => ({
    default: Widget,
  }))
)

export const SkipGoComponent: ActionComponent = ({ fieldNamePrefix }) => {
  const { t } = useTranslation()
  const { watch, setValue } = useFormContext<SkipGoData>()

  const chainId = watch((fieldNamePrefix + 'chainId') as 'chainId')
  const message = watch((fieldNamePrefix + 'message') as 'message')

  const accounts = useActionOptions().context.accounts.filter(
    (a) => a.type === AccountType.Base || a.type === AccountType.Polytone
  )
  const account = accounts.find((a) => a.chainId === chainId)

  // Use unique ID to force remount of widget when changing message.
  const [visible, setVisible] = useState<string | undefined>(
    // Show widget if message is empty.
    message === '{}' ? undefined : 'first'
  )

  return (
    <>
      {visible ? (
        <div className="self-start animate-fade-in max-w-md">
          <SuspenseLoader fallback={<Loader />}>
            <LazyWidget
              key={visible}
              brandColor="var(--color-brand)"
              connectedAddresses={Object.fromEntries(
                accounts.map((a) => [a.chainId, a.address])
              )}
              getCosmosSigner={async (chainId) => {
                const account = accounts.find((a) => a.chainId === chainId)
                if (!account) {
                  throw new Error('Account not found')
                }

                const { address } = account

                class SkipGoCosmosSigner implements OfflineDirectSigner {
                  async getAccounts(): Promise<AccountData[]> {
                    return [
                      {
                        address,
                        algo: 'secp256k1',
                        pubkey: EMPTY_PUB_KEY,
                      },
                    ]
                  }

                  async signDirect(
                    _signer: string,
                    signDoc: SignDoc
                  ): Promise<DirectSignResponse> {
                    if (!signDoc?.bodyBytes || !signDoc?.chainId) {
                      throw new Error('Invalid sign doc')
                    }

                    const encodedMessages = TxBody.decode(
                      signDoc.bodyBytes
                    ).messages
                    const messages = encodedMessages.flatMap(
                      (msg) =>
                        protobufToCwMsg(
                          getChainForChainId(signDoc.chainId),
                          msg,
                          false
                        ).msg
                    )

                    setValue(
                      (fieldNamePrefix + 'chainId') as 'chainId',
                      signDoc.chainId
                    )
                    setValue(
                      (fieldNamePrefix + 'message') as 'message',
                      JSON.stringify(
                        messages.length === 1 ? messages[0] : messages,
                        null,
                        2
                      )
                    )

                    setVisible(undefined)

                    throw new Error('Handled by DAO DAO')
                  }
                }

                return new SkipGoCosmosSigner()
              }}
              routeConfig={{
                experimentalFeatures: ['hyperlane', 'cctp', 'stargate'],
                allowMultiTx: false,
                allowSwaps: true,
                allowUnsafe: false,
                goFast: false,
              }}
            />
          </SuspenseLoader>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 items-start">
            <InputLabel name={t('title.account')} />
            <InputThemedText>{account?.address}</InputThemedText>
          </div>

          <div className="flex flex-col gap-2 items-start">
            <InputLabel name={t('form.message')} />
            <RawActionsRendererMessages
              className="max-w-full"
              messages={[JSON.parse(message)].flat()}
            />
          </div>

          <Button
            className={clsx(
              'self-start animate-fade-in',
              visible ? 'hidden' : 'block'
            )}
            onClick={() => setVisible(nanoid())}
            variant={message ? 'secondary' : 'primary'}
          >
            {t('button.changeMessage')}
          </Button>
        </>
      )}
    </>
  )
}
