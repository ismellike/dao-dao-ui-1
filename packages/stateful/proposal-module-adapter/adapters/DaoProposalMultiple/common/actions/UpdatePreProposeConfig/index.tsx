import { useCallback, useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { constSelector, useRecoilValueLoadable } from 'recoil'

import {
  DaoPreProposeMultipleSelectors,
  genericTokenSelector,
} from '@dao-dao/state'
import { GearEmoji, useCachedLoadingWithError } from '@dao-dao/stateless'
import {
  ActionComponent,
  ActionContextType,
  ActionKey,
  ActionMaker,
  DepositRefundPolicy,
  ProposalModule,
  TokenType,
  UseDecodedCosmosMsg,
  UseDefaults,
  UseTransformToCosmos,
} from '@dao-dao/types'
import {
  ExecuteMsg,
  UncheckedDepositInfo,
} from '@dao-dao/types/contracts/DaoPreProposeMultiple'
import {
  DAO_PRE_PROPOSE_MULTIPLE_CONTRACT_NAMES,
  convertDenomToMicroDenomWithDecimals,
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
  isValidContractAddress,
  makeWasmMessage,
} from '@dao-dao/utils'

import {
  useActionOptions,
  useMsgExecutesContract,
} from '../../../../../../actions'
import { useVotingModuleAdapter } from '../../../../../../voting-module-adapter'
import {
  UpdatePreProposeConfigComponent,
  UpdatePreProposeConfigData,
} from './UpdatePreProposeConfigComponent'

export const Component: ActionComponent = (props) => {
  const { t } = useTranslation()
  const {
    chain: { chain_id: chainId, bech32_prefix: bech32Prefix },
  } = useActionOptions()

  const {
    hooks: { useCommonGovernanceTokenInfo },
  } = useVotingModuleAdapter()
  const governanceToken = useCommonGovernanceTokenInfo?.()

  const { fieldNamePrefix } = props

  const { setValue, watch } = useFormContext()

  const depositInfo: UpdatePreProposeConfigData['depositInfo'] = watch(
    fieldNamePrefix + 'depositInfo'
  )

  const tokenLoadable = useRecoilValueLoadable(
    depositInfo.type === 'cw20' &&
      depositInfo.denomOrAddress &&
      isValidContractAddress(depositInfo.denomOrAddress, bech32Prefix)
      ? genericTokenSelector({
          chainId,
          type: TokenType.Cw20,
          denomOrAddress: depositInfo.denomOrAddress,
        })
      : depositInfo.type === 'native'
      ? genericTokenSelector({
          chainId,
          type: TokenType.Native,
          denomOrAddress: depositInfo.denomOrAddress,
        })
      : depositInfo.type === 'voting_module_token'
      ? constSelector(governanceToken)
      : constSelector(undefined)
  )

  // Update token and cw20 address error.
  const [cw20AddressError, setCw20AddressError] = useState<string>()
  useEffect(() => {
    // Update token in data for transforming to cosmos message.
    if (tokenLoadable.state === 'hasValue') {
      setValue(fieldNamePrefix + 'depositInfo.token', tokenLoadable.contents)
    }

    if (tokenLoadable.state !== 'hasError' || depositInfo.type !== 'cw20') {
      if (cw20AddressError) {
        setCw20AddressError(undefined)
      }
      return
    }

    if (!cw20AddressError && depositInfo.type === 'cw20') {
      setCw20AddressError(t('error.notCw20Address'))
    }
  }, [
    fieldNamePrefix,
    setValue,
    tokenLoadable,
    t,
    cw20AddressError,
    depositInfo.type,
  ])

  return (
    <UpdatePreProposeConfigComponent
      {...props}
      options={{
        governanceToken,
        cw20AddressError,
      }}
    />
  )
}

export const makeUpdatePreProposeConfigActionMaker =
  ({ prePropose }: ProposalModule): ActionMaker<UpdatePreProposeConfigData> =>
  ({ t, context, chain: { chain_id: chainId } }) => {
    // Only when pre propose address present.
    if (!prePropose) {
      return null
    }

    const preProposeAddress = prePropose.address

    const useDefaults: UseDefaults<UpdatePreProposeConfigData> = () => {
      const {
        hooks: { useCommonGovernanceTokenInfo },
      } = useVotingModuleAdapter()
      const { denomOrAddress: governanceTokenDenomOrAddress } =
        useCommonGovernanceTokenInfo?.() ?? {}

      const configLoading = useCachedLoadingWithError(
        DaoPreProposeMultipleSelectors.configSelector({
          chainId,
          contractAddress: preProposeAddress,
          params: [],
        })
      )

      // The config response only contains `native` or `cw20`, as
      // `voting_module_token` is only passed in an execution. The contract
      // converts it to `cw20`.
      const tokenLoading = useCachedLoadingWithError(
        configLoading.loading || configLoading.errored
          ? undefined
          : configLoading.data.deposit_info
          ? genericTokenSelector({
              chainId,
              type:
                'native' in configLoading.data.deposit_info.denom
                  ? TokenType.Native
                  : TokenType.Cw20,
              denomOrAddress:
                'native' in configLoading.data.deposit_info.denom
                  ? configLoading.data.deposit_info.denom.native
                  : configLoading.data.deposit_info.denom.cw20,
            })
          : constSelector(undefined)
      )

      if (configLoading.loading || tokenLoading.loading) {
        return
      }
      if (configLoading.errored) {
        return configLoading.error
      }
      if (tokenLoading.errored) {
        return tokenLoading.error
      }

      const token = tokenLoading.data
      const config = configLoading.data

      const isVotingModuleToken =
        governanceTokenDenomOrAddress &&
        token &&
        token.denomOrAddress === governanceTokenDenomOrAddress

      const depositRequired = !!config.deposit_info
      const depositInfo: UpdatePreProposeConfigData['depositInfo'] =
        config.deposit_info
          ? {
              amount: convertMicroDenomToDenomWithDecimals(
                config.deposit_info.amount,
                token?.decimals ?? 0
              ),
              type: isVotingModuleToken
                ? 'voting_module_token'
                : 'native' in config.deposit_info.denom
                ? 'native'
                : 'cw20',
              denomOrAddress: isVotingModuleToken
                ? governanceTokenDenomOrAddress
                : 'native' in config.deposit_info.denom
                ? config.deposit_info.denom.native
                : config.deposit_info.denom.cw20,
              token,
              refundPolicy: config.deposit_info.refund_policy,
            }
          : {
              amount: 1,
              type: 'native',
              denomOrAddress: getNativeTokenForChainId(chainId).denomOrAddress,
              token: undefined,
              refundPolicy: DepositRefundPolicy.OnlyPassed,
            }

      return {
        depositRequired,
        depositInfo,
        anyoneCanPropose: config.open_proposal_submission,
      }
    }

    const useTransformToCosmos: UseTransformToCosmos<
      UpdatePreProposeConfigData
    > = () =>
      useCallback(
        ({
          depositRequired,
          depositInfo,
          anyoneCanPropose,
        }: UpdatePreProposeConfigData) => {
          const votingModuleTokenType =
            depositRequired && depositInfo.type === 'voting_module_token'
              ? depositInfo.token?.type
              : false
          if (votingModuleTokenType === undefined) {
            throw new Error(t('error.loadingData'))
          }

          const updateConfigMessage: ExecuteMsg = {
            update_config: {
              deposit_info: depositRequired
                ? {
                    amount: convertDenomToMicroDenomWithDecimals(
                      depositInfo.amount,
                      depositInfo.token?.decimals ?? 0
                    ).toString(),
                    denom:
                      depositInfo.type === 'voting_module_token'
                        ? {
                            voting_module_token: {
                              token_type:
                                votingModuleTokenType === TokenType.Native
                                  ? 'native'
                                  : votingModuleTokenType === TokenType.Cw20
                                  ? 'cw20'
                                  : // Cause a chain error. Should never happen.
                                    ('invalid' as never),
                            },
                          }
                        : {
                            token: {
                              denom:
                                depositInfo.type === 'native'
                                  ? {
                                      native: depositInfo.denomOrAddress,
                                    }
                                  : // depositInfo.type === 'cw20'
                                    {
                                      cw20: depositInfo.denomOrAddress,
                                    },
                            },
                          },
                    refund_policy: depositInfo.refundPolicy,
                  }
                : null,
              open_proposal_submission: anyoneCanPropose,
            },
          }

          return makeWasmMessage({
            wasm: {
              execute: {
                contract_addr: preProposeAddress,
                funds: [],
                msg: updateConfigMessage,
              },
            },
          })
        },
        []
      )

    const useDecodedCosmosMsg: UseDecodedCosmosMsg<
      UpdatePreProposeConfigData
    > = (msg: Record<string, any>) => {
      const isUpdatePreProposeConfig = useMsgExecutesContract(
        msg,
        DAO_PRE_PROPOSE_MULTIPLE_CONTRACT_NAMES,
        {
          wasm: {
            execute: {
              contract_addr: {},
              funds: {},
              msg: {
                update_config: {
                  deposit_info: {},
                  open_proposal_submission: {},
                },
              },
            },
          },
        }
      )

      const configDepositInfo = msg.wasm?.execute?.msg?.update_config
        ?.deposit_info as UncheckedDepositInfo | null | undefined

      const {
        hooks: { useCommonGovernanceTokenInfo },
      } = useVotingModuleAdapter()
      const governanceToken = useCommonGovernanceTokenInfo?.()

      const token = useCachedLoadingWithError(
        isUpdatePreProposeConfig &&
          configDepositInfo &&
          isUpdatePreProposeConfig
          ? 'voting_module_token' in configDepositInfo.denom
            ? constSelector(governanceToken)
            : genericTokenSelector({
                chainId,
                type:
                  'native' in configDepositInfo.denom.token.denom
                    ? TokenType.Native
                    : TokenType.Cw20,
                denomOrAddress:
                  'native' in configDepositInfo.denom.token.denom
                    ? configDepositInfo.denom.token.denom.native
                    : configDepositInfo.denom.token.denom.cw20,
              })
          : constSelector(undefined)
      )

      if (!isUpdatePreProposeConfig || token.loading || token.errored) {
        return { match: false }
      }

      const anyoneCanPropose =
        !!msg.wasm.execute.msg.update_config.open_proposal_submission

      if (!configDepositInfo || !token.data) {
        return {
          data: {
            depositRequired: false,
            depositInfo: {
              amount: 1,
              type: 'native',
              denomOrAddress: getNativeTokenForChainId(chainId).denomOrAddress,
              refundPolicy: DepositRefundPolicy.OnlyPassed,
            },
            anyoneCanPropose,
          },
          match: true,
        }
      }

      const type: UpdatePreProposeConfigData['depositInfo']['type'] =
        'voting_module_token' in configDepositInfo.denom
          ? 'voting_module_token'
          : 'native' in configDepositInfo.denom.token.denom
          ? 'native'
          : 'cw20'

      const depositInfo: UpdatePreProposeConfigData['depositInfo'] = {
        amount: convertMicroDenomToDenomWithDecimals(
          configDepositInfo.amount,
          token.data.decimals
        ),
        type,
        denomOrAddress: token.data.denomOrAddress,
        token: token.data,
        refundPolicy: configDepositInfo.refund_policy,
      }

      return {
        data: {
          depositRequired: true,
          depositInfo,
          anyoneCanPropose,
        },
        match: true,
      }
    }

    return {
      key: ActionKey.UpdatePreProposeMultipleConfig,
      Icon: GearEmoji,
      label: t('form.updateProposalSubmissionConfigTitle', {
        context:
          // If more than one proposal module, specify which one this is.
          context.type === ActionContextType.Dao &&
          context.info.proposalModules.length > 1
            ? 'multipleChoice'
            : undefined,
      }),
      description: t('info.updateProposalSubmissionConfigActionDescription'),
      notReusable: true,
      Component,
      useDefaults,
      useTransformToCosmos,
      useDecodedCosmosMsg,
    }
  }
