import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSetRecoilState } from 'recoil'

import { latestProposalSaveAtom } from '@dao-dao/state/recoil'
import { StatusCard, useActionsContext, useDao } from '@dao-dao/stateless'
import { DaoProposalSingleAdapterId } from '@dao-dao/utils'

import {
  ProposalModuleAdapterCommonProvider,
  matchAdapter as matchProposalModuleAdapter,
} from '../../../proposal-module-adapter'
import { NewProposalForm } from '../../../proposal-module-adapter/adapters/DaoProposalSingle/types'
import { AppsRenderer, AppsRendererExecutorProps } from '../../apps'
import { ProposalActionShoppingCart } from '../ProposalActionShoppingCart'

export const AppsTab = () => {
  const { t } = useTranslation()
  const dao = useDao()

  // Select the single choice proposal module to use for proposals.
  const singleChoiceProposalModule = dao.proposalModules.find(
    ({ contractName }) =>
      matchProposalModuleAdapter(contractName)?.id ===
      DaoProposalSingleAdapterId
  )

  return singleChoiceProposalModule ? (
    <ProposalModuleAdapterCommonProvider
      proposalModuleAddress={singleChoiceProposalModule.address}
    >
      <AppsRenderer Executor={AppsTabExecutor} mode="dao" />
    </ProposalModuleAdapterCommonProvider>
  ) : (
    <StatusCard
      content={t('error.noSingleChoiceProposalModuleAppsDisabled')}
      style="warning"
    />
  )
}

const AppsTabExecutor = ({
  actionCount,
  onClose,
  data,
}: AppsRendererExecutorProps) => {
  const dao = useDao()
  const { t } = useTranslation()
  const { actionMap } = useActionsContext()
  const setProposalSave = useSetRecoilState<NewProposalForm>(
    latestProposalSaveAtom(dao.proposalSaveLocalStorageKey)
  )

  // When the data is done loading, add the loaded actions to the proposal save.
  useEffect(() => {
    if (data.loading || data.errored) {
      return
    }

    setProposalSave((save) => ({
      ...save,
      actionData: [
        ...(save?.actionData || []),
        ...data.data.map((d) => ({
          ...d,
          // Make actions read-only so they can't be edited.
          readOnly: true,
        })),
      ],
    }))
  }, [data, setProposalSave])

  return (
    <ProposalActionShoppingCart
      actionMap={actionMap}
      dao={dao}
      error={data.errored ? data.error : undefined}
      loading={data.loading && actionCount}
      modalSubtitleOverride={
        data.loading
          ? t('info.addingActions', {
              count: actionCount,
            })
          : undefined
      }
      mode="modal"
      onClose={onClose}
    />
  )
}
