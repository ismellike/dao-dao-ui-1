import { Add, EscalatorWarning, Upgrade } from '@mui/icons-material'
import { ComponentType } from 'react'
import { useTranslation } from 'react-i18next'

import {
  ButtonLinkProps,
  ContractVersion,
  DaoCardInfo,
  Feature,
  LoadingData,
} from '@dao-dao/types'

import { useDaoInfoContext, useDaoNavHelpers } from '../../../hooks'
import { GridCardContainer } from '../../GridCardContainer'
import { Loader } from '../../logo/Loader'
import { NoContent } from '../../NoContent'
import { Tooltip } from '../../tooltip'

export interface SubDaosTabProps {
  DaoCard: ComponentType<DaoCardInfo>
  subDaos: LoadingData<DaoCardInfo[]>
  isMember: boolean
  createSubDaoHref?: string
  upgradeToV2Href?: string
  hideCreateButton?: boolean
  ButtonLink: ComponentType<ButtonLinkProps>
}

export const SubDaosTab = ({
  DaoCard,
  subDaos,
  isMember,
  createSubDaoHref,
  upgradeToV2Href,
  hideCreateButton,
  ButtonLink,
}: SubDaosTabProps) => {
  const { t } = useTranslation()
  const { coreAddress, coreVersion, name, supportedFeatures } =
    useDaoInfoContext()
  const { getDaoPath } = useDaoNavHelpers()

  const subDaosSupported =
    coreVersion === ContractVersion.Gov || supportedFeatures[Feature.SubDaos]

  return (
    <>
      {/* header min-height of 3.5rem standardized across all tabs */}
      <div className="flex min-h-[3.5rem] flex-row items-center justify-between gap-8 pb-6">
        <div className="flex flex-row flex-wrap items-center gap-x-4 gap-y-1">
          <p className="title-text text-text-body">{t('title.subDaos')}</p>
          <p className="secondary-text">{t('info.subDaoExplanation')}</p>
        </div>

        {!hideCreateButton && (
          <Tooltip
            title={
              !subDaosSupported
                ? t('error.daoFeatureUnsupported', {
                    name,
                    feature: t('title.subDaos'),
                  })
                : !isMember
                ? t('error.mustBeMemberToCreateSubDao')
                : undefined
            }
          >
            <ButtonLink
              className="shrink-0"
              disabled={!isMember || !subDaosSupported}
              href={getDaoPath(coreAddress, 'create')}
            >
              <Add className="!h-4 !w-4" />
              {t('button.newSubDao')}
            </ButtonLink>
          </Tooltip>
        )}
      </div>

      {!subDaosSupported ? (
        <NoContent
          Icon={Upgrade}
          actionNudge={t('info.submitUpgradeProposal')}
          body={t('error.daoFeatureUnsupported', {
            name,
            feature: t('title.subDaos'),
          })}
          buttonLabel={t('button.proposeUpgrade')}
          href={isMember ? upgradeToV2Href : undefined}
        />
      ) : subDaos.loading ? (
        <div className="border-t border-border-secondary pt-6">
          <Loader fill={false} />
        </div>
      ) : subDaos.data.length > 0 ? (
        <>
          <p className="title-text mb-6 border-t border-border-secondary pt-6 text-text-body">
            {t('title.numSubDaos', { count: subDaos.data.length })}
          </p>

          <GridCardContainer>
            {subDaos.data.map((props, index) => (
              <DaoCard {...props} key={index} />
            ))}
          </GridCardContainer>
        </>
      ) : (
        <NoContent
          Icon={EscalatorWarning}
          actionNudge={t('info.createFirstOneQuestion')}
          body={t('info.noSubDaosYet')}
          buttonLabel={t('button.newSubDao')}
          href={isMember ? createSubDaoHref : undefined}
        />
      )}
    </>
  )
}
