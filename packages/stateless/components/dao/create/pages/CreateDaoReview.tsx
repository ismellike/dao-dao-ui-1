import cloneDeep from 'lodash.clonedeep'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { CreateDaoContext } from '@dao-dao/types'
import { parseEncodedMessage, processError } from '@dao-dao/utils'

import { CosmosMessageDisplay } from '../../../CosmosMessageDisplay'
import { Checkbox } from '../../../inputs/Checkbox'
import { DaoCreateConfigReviewCard } from '../DaoCreateConfigReviewCard'

export const CreateDaoReview = ({
  form: { watch },
  commonVotingConfig,
  creator,
  proposalModuleDaoCreationAdapters,
  instantiateMsg,
  instantiateMsgError,
}: CreateDaoContext) => {
  const { t } = useTranslation()

  const newDao = watch()
  const {
    creator: { data: creatorData },
    proposalModuleAdapters,
    votingConfig,
  } = newDao

  const togglePreviewRef = useRef<HTMLDivElement>(null)
  const [decodeModuleMessages, setDecodeModuleMessages] = useState(true)
  const [showingPreview, setShowingPreview] = useState(false)

  let previewJson: string | undefined
  let previewError: string | undefined
  try {
    if (instantiateMsgError) {
      throw new Error(instantiateMsgError)
    } else if (!instantiateMsg) {
      throw new Error(t('error.daoCreationIncomplete'))
    }

    const msg = cloneDeep(instantiateMsg)
    // Convert encoded module instantiation messages back to readable JSON.
    if (decodeModuleMessages) {
      msg.proposal_modules_instantiate_info.forEach((info) => {
        const msg = parseEncodedMessage(info.msg)

        // Convert encoded pre_propose_info message back to readable JSON.
        if (
          'pre_propose_info' in msg &&
          'module_may_propose' in msg.pre_propose_info &&
          'info' in msg.pre_propose_info.module_may_propose &&
          'msg' in msg.pre_propose_info.module_may_propose.info
        ) {
          msg.pre_propose_info.module_may_propose.info.msg =
            parseEncodedMessage(
              msg.pre_propose_info.module_may_propose.info.msg
            )
        }

        info.msg = msg
      })
      msg.voting_module_instantiate_info.msg = parseEncodedMessage(
        msg.voting_module_instantiate_info.msg
      )
    }
    // Pretty print output.
    previewJson = JSON.stringify(msg, undefined, 2)
  } catch (err) {
    console.error(err)
    previewError = processError(err, {
      forceCapture: false,
    })
  }

  const togglePreview = () => setShowingPreview((s) => !s)

  return (
    <>
      <p className="title-text mt-9 mb-7 text-text-body">
        {t('title.governanceConfiguration')}
      </p>

      <creator.governanceConfig.Review data={creatorData} newDao={newDao} />

      <p className="title-text mt-9 mb-7 text-text-body">
        {t('title.votingConfiguration')}
      </p>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {creator.votingConfig.items
          .concat(creator.votingConfig.advancedItems ?? [])
          .map(
            (
              {
                onlyDisplayCondition,
                Icon,
                nameI18nKey,
                tooltipI18nKey,
                Review,
                getReviewClassName,
              },
              index
            ) =>
              // If has display condition, check it. Otherwise display.
              (onlyDisplayCondition?.(newDao) ?? true) && (
                <DaoCreateConfigReviewCard
                  key={index}
                  Icon={Icon}
                  name={t(nameI18nKey)}
                  review={<Review data={creatorData} newDao={newDao} />}
                  reviewClassName={getReviewClassName?.(creatorData)}
                  tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                />
              )
          )}
        {proposalModuleDaoCreationAdapters.flatMap(
          (
            { extraVotingConfig: { items = [], advancedItems = [] } = {} },
            index
          ) =>
            items.concat(advancedItems ?? []).map(
              (
                {
                  onlyDisplayCondition,
                  Icon,
                  nameI18nKey,
                  tooltipI18nKey,
                  Review,
                  getReviewClassName,
                },
                itemIndex
              ) =>
                // If has display condition, check it. Otherwise display.
                (onlyDisplayCondition?.(newDao) ?? true) && (
                  <DaoCreateConfigReviewCard
                    key={`${index}:${itemIndex}`}
                    Icon={Icon}
                    name={t(nameI18nKey)}
                    review={
                      <Review
                        data={proposalModuleAdapters[index].data}
                        newDao={newDao}
                      />
                    }
                    reviewClassName={getReviewClassName?.(
                      proposalModuleAdapters[index].data
                    )}
                    tooltip={tooltipI18nKey && t(tooltipI18nKey)}
                  />
                )
            )
        )}
        {[...commonVotingConfig.items, ...commonVotingConfig.advancedItems].map(
          (
            {
              onlyDisplayCondition,
              Icon,
              nameI18nKey,
              tooltipI18nKey,
              Review,
              getReviewClassName,
            },
            index
          ) =>
            // If has display condition, check it. Otherwise display.
            (onlyDisplayCondition?.(newDao) ?? true) && (
              <DaoCreateConfigReviewCard
                key={index}
                Icon={Icon}
                name={t(nameI18nKey)}
                review={<Review data={votingConfig} newDao={newDao} />}
                reviewClassName={getReviewClassName?.(votingConfig)}
                tooltip={tooltipI18nKey && t(tooltipI18nKey)}
              />
            )
        )}
      </div>

      <div
        className="mt-8 flex flex-row flex-wrap items-center gap-6"
        ref={togglePreviewRef}
      >
        <div className="flex flex-row items-center gap-2">
          <Checkbox checked={showingPreview} onClick={togglePreview} />
          <p className="body-text cursor-pointer" onClick={togglePreview}>
            {t('button.showInstantiateMessage')}
          </p>
        </div>

        {showingPreview && (
          <div className="flex flex-row items-center gap-2">
            <Checkbox
              checked={decodeModuleMessages}
              onClick={() => setDecodeModuleMessages((d) => !d)}
            />

            <p
              className="body-text cursor-pointer"
              onClick={() => setDecodeModuleMessages((d) => !d)}
            >
              {t('button.withDecodedModuleMessages')}
            </p>
          </div>
        )}
      </div>

      {showingPreview && !!previewJson && (
        <div className="mt-4">
          <CosmosMessageDisplay value={previewJson} />
        </div>
      )}
      {!!previewError && (
        <p className="mt-4 text-text-interactive-error">{previewError}</p>
      )}
    </>
  )
}
