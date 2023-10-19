import { Account } from '../account'

export type DaoTreasuryHistoryGraphProps = {
  // If defined, only show history for this account.
  account?: Account
  // If account above is a valence account, and `showRebalancer` is true, only
  // show rebalanced tokens with their associated targets.
  showRebalancer?: boolean
  className?: string
}
