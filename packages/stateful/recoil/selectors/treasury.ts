import { selectorFamily } from 'recoil'

import {
  DaoCoreV2Selectors,
  nativeBalancesSelector,
  nativeDelegatedBalanceSelector,
} from '@dao-dao/state'
import { TokenCardInfo, WithChainId } from '@dao-dao/types'
import {
  convertMicroDenomToDenomWithDecimals,
  getNativeTokenForChainId,
} from '@dao-dao/utils'

// lazyInfo must be loaded in the component separately, since it refreshes on a
// timer and we don't want this whole selector to reevaluate and load when that
// refreshes. Use `tokenCardLazyInfoSelector`.
export const treasuryTokenCardInfosSelector = selectorFamily<
  TokenCardInfo[],
  WithChainId<{
    coreAddress: string
    cw20GovernanceTokenAddress?: string
    nativeGovernanceTokenDenom?: string
  }>
>({
  key: 'treasuryTokenCardInfos',
  get:
    ({
      chainId,
      coreAddress,
      cw20GovernanceTokenAddress,
      nativeGovernanceTokenDenom,
    }) =>
    ({ get }) => {
      const polytoneProxies = Object.entries(
        get(
          DaoCoreV2Selectors.polytoneProxiesSelector({
            chainId,
            contractAddress: coreAddress,
          })
        )
      )

      const allNativeBalances = [
        // Native.
        {
          owner: coreAddress,
          chainId,
          balances: get(
            nativeBalancesSelector({
              address: coreAddress,
              chainId,
            })
          ),
        },
        // Polytone.
        ...polytoneProxies.map(([chainId, proxy]) => ({
          owner: proxy,
          chainId,
          balances: get(
            nativeBalancesSelector({
              address: proxy,
              chainId,
            })
          ),
        })),
      ]

      // Only cw20s on native chain.
      const cw20s = get(
        DaoCoreV2Selectors.allCw20TokensWithBalancesSelector({
          contractAddress: coreAddress,
          chainId,
          governanceTokenAddress: cw20GovernanceTokenAddress,
        })
      )

      const infos: TokenCardInfo[] = [
        ...allNativeBalances.flatMap(({ owner, chainId, balances }) =>
          balances.map(({ token, balance }) => {
            const unstakedBalance = convertMicroDenomToDenomWithDecimals(
              balance,
              token.decimals
            )

            // Staking info only exists for native token.
            const hasStakingInfo =
              token.denomOrAddress ===
                getNativeTokenForChainId(chainId).denomOrAddress &&
              // Check if anything staked.
              Number(
                get(
                  nativeDelegatedBalanceSelector({
                    address: owner,
                    chainId,
                  })
                ).amount
              ) > 0

            const info: TokenCardInfo = {
              owner,
              token,
              // True if native token DAO and using this denom.
              isGovernanceToken:
                nativeGovernanceTokenDenom === token.denomOrAddress,
              unstakedBalance,
              hasStakingInfo,

              lazyInfo: { loading: true },
            }

            return info
          })
        ),
        ...cw20s.map(({ token, balance, isGovernanceToken }) => {
          const unstakedBalance = convertMicroDenomToDenomWithDecimals(
            balance,
            token.decimals
          )

          const info: TokenCardInfo = {
            owner: coreAddress,
            token,
            isGovernanceToken: isGovernanceToken ?? false,
            unstakedBalance,
            // No unstaking info for CW20.
            hasStakingInfo: false,

            lazyInfo: { loading: true },
          }

          return info
        }),
      ]

      return infos
    },
})
