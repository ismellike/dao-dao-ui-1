import { useCallback, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useRecoilValue } from 'recoil'

import { HugeDecimal } from '@dao-dao/math'
import {
  blockHeightSelector,
  blocksPerYearSelector,
  stakingLoadingAtom,
} from '@dao-dao/state'
import {
  useCachedLoadable,
  useChain,
  useDao,
  useUpdatingRef,
} from '@dao-dao/stateless'
import {
  BaseProfileCardMemberInfoProps,
  Feature,
  UnstakingTask,
  UnstakingTaskStatus,
} from '@dao-dao/types'
import {
  convertExpirationToDate,
  durationToSeconds,
  executeSmartContracts,
  isFeatureSupportedByVersion,
  processError,
} from '@dao-dao/utils'

import { useAwaitNextBlock, useWallet } from '../../../../hooks'
import { ProfileCardMemberInfoTokens } from '../../../components'
import { useGovernanceCollectionInfo, useStakingInfo } from '../hooks'
import { StakingModal } from './StakingModal'

export const ProfileCardMemberInfo = ({
  maxGovernanceTokenDeposit,
  ...props
}: BaseProfileCardMemberInfoProps) => {
  const { t } = useTranslation()
  const { chainId } = useChain()
  const { name: daoName, votingModule } = useDao()
  const {
    address: walletAddress,
    isWalletConnected,
    refreshBalances,
    getSigningClient,
  } = useWallet()
  const [showStakingModal, setShowStakingModal] = useState(false)
  const [claimingLoading, setClaimingLoading] = useState(false)
  const stakingLoading = useRecoilValue(stakingLoadingAtom)

  const {
    collectionInfo,
    token,
    loadingWalletBalance: loadingUnstakedBalance,
  } = useGovernanceCollectionInfo({
    fetchWalletBalance: true,
  })

  const {
    stakingContractAddress,
    unstakingDuration,
    refreshTotals,
    claimsPending,
    claimsAvailable,
    loadingWalletStakedValue,
    loadingTotalStakedValue,
    refreshClaims,
  } = useStakingInfo({
    fetchClaims: true,
    fetchWalletStakedValue: true,
    fetchTotalStakedValue: true,
  })

  const claimsAvailableRef = useUpdatingRef(claimsAvailable)
  const awaitNextBlock = useAwaitNextBlock()
  const onClaim = useCallback(async () => {
    if (!isWalletConnected || !walletAddress) {
      return toast.error(t('error.logInToContinue'))
    }

    const claimsAvailable = claimsAvailableRef.current
    if (!claimsAvailable?.length) {
      return toast.error(t('error.noClaimsAvailable'))
    }

    setClaimingLoading(true)
    try {
      await executeSmartContracts({
        client: getSigningClient,
        sender: walletAddress,
        instructions: isFeatureSupportedByVersion(
          Feature.UnlimitedNftClaims,
          votingModule.version
        )
          ? [
              // If legacy claims exist, claim them.
              ...(claimsAvailable.some(({ legacy }) => legacy)
                ? [
                    {
                      contractAddress: stakingContractAddress,
                      msg: {
                        claim_nfts: {
                          type: 'legacy',
                        },
                      },
                    },
                  ]
                : []),
              // If non-legacy claims exist, claim them specifically.
              ...(claimsAvailable.some(({ legacy }) => !legacy)
                ? [
                    {
                      contractAddress: stakingContractAddress,
                      msg: {
                        claim_nfts: {
                          type: {
                            specific: claimsAvailable
                              .filter(({ legacy }) => !legacy)
                              .map(({ token_id }) => token_id),
                          },
                        },
                      },
                    },
                  ]
                : []),
            ]
          : [
              {
                contractAddress: stakingContractAddress,
                msg: {
                  claim_nfts: {},
                },
              },
            ],
      })

      // New balances will not appear until the next block.
      await awaitNextBlock()

      refreshBalances()
      refreshTotals()
      refreshClaims?.()

      toast.success(
        t('success.claimedTokens', {
          amount: HugeDecimal.from(
            claimsAvailable.length
          ).toInternationalizedHumanReadableString(),
          tokenSymbol: collectionInfo.symbol,
        })
      )
    } catch (err) {
      console.error(err)
      toast.error(processError(err))
    } finally {
      setClaimingLoading(false)
    }
  }, [
    isWalletConnected,
    walletAddress,
    t,
    getSigningClient,
    votingModule.version,
    stakingContractAddress,
    awaitNextBlock,
    refreshBalances,
    refreshTotals,
    refreshClaims,
    collectionInfo.symbol,
    claimsAvailableRef,
  ])

  const blockHeightLoadable = useCachedLoadable(
    blockHeightSelector({
      chainId,
    })
  )
  const blocksPerYear = useRecoilValue(
    blocksPerYearSelector({
      chainId,
    })
  )

  const unstakingTasks: UnstakingTask[] = [
    ...(claimsPending ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.Unstaking,
      amount: HugeDecimal.one,
      date: convertExpirationToDate(
        blocksPerYear,
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
    ...(claimsAvailable ?? []).map(({ release_at }) => ({
      token,
      status: UnstakingTaskStatus.ReadyToClaim,
      amount: HugeDecimal.one,
      date: convertExpirationToDate(
        blocksPerYear,
        release_at,
        blockHeightLoadable.state === 'hasValue'
          ? blockHeightLoadable.contents
          : 0
      ),
    })),
  ]

  return (
    <>
      <ProfileCardMemberInfoTokens
        claimingLoading={claimingLoading}
        daoName={daoName}
        loadingTokens={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingUnstakedBalance ||
          loadingUnstakedBalance.loading
            ? {
                loading: true,
              }
            : {
                loading: false,
                data: [
                  {
                    token,
                    staked: loadingWalletStakedValue.data,
                    unstaked: loadingUnstakedBalance.data,
                  },
                ],
              }
        }
        loadingVotingPower={
          !loadingWalletStakedValue ||
          loadingWalletStakedValue.loading ||
          !loadingTotalStakedValue ||
          loadingTotalStakedValue.loading
            ? { loading: true }
            : {
                loading: false,
                data: loadingWalletStakedValue.data
                  .div(loadingTotalStakedValue.data)
                  .times(100)
                  .toNumber(),
              }
        }
        onClaim={onClaim}
        onStake={() => setShowStakingModal(true)}
        refreshUnstakingTasks={() => refreshClaims?.()}
        stakingLoading={stakingLoading}
        unstakingDurationSeconds={
          (unstakingDuration &&
            durationToSeconds(blocksPerYear, unstakingDuration)) ||
          undefined
        }
        unstakingTasks={unstakingTasks}
        {...props}
      />

      <StakingModal
        maxDeposit={maxGovernanceTokenDeposit}
        onClose={() => setShowStakingModal(false)}
        visible={showStakingModal}
      />
    </>
  )
}
