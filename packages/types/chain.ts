import { Chain } from '@chain-registry/types'

import { Coin } from './contracts'
import { GenericToken } from './token'

export type IChainContext = {
  chainId: string
  chain: Chain
  // Chain may not have a native token.
  nativeToken?: GenericToken
  // If defined, this is a supported chain.
  config?: SupportedChainConfig
}

// Require supported chain config.
export type SupportedChainContext = Omit<IChainContext, 'config'> & {
  config: SupportedChainConfig
}

export interface Validator {
  address: string
  moniker: string
  website: string
  details: string
  commission: number
  status: string
  tokens: number
}

export interface Delegation {
  validator: Validator
  delegated: Coin
  pendingReward: Coin
}

export interface UnbondingDelegation {
  validator: Validator
  balance: Coin
  startedAtHeight: number
  finishesAt: Date
}

export interface NativeDelegationInfo {
  delegations: Delegation[]
  unbondingDelegations: UnbondingDelegation[]
}

export enum ChainId {
  JunoMainnet = 'juno-1',
  JunoTestnet = 'uni-6',
  OsmosisMainnet = 'osmosis-1',
  OsmosisTestnet = 'osmo-test-5',
  StargazeMainnet = 'stargaze-1',
  StargazeTestnet = 'elgafar-1',
  NeutronMainnet = 'neutron-1',
}

export type SupportedChainConfig = {
  // Unique name among chain configs with the same `mainnet` flag. This is used
  // to identify the chain in the native governance UI.
  name: string
  mainnet: boolean
  accentColor: string
  factoryContractAddress: string
  // Supports new v1 gov proposals introduced in cosmos-sdk v47. Some chains
  // that fork the SDK, like Osmosis, don't support v1 gov proposals even though
  // they use cosmos-sdk v47 or higher, so we need a hardcoded flag.
  supportsV1GovProposals: boolean
  // If defined, it means Kado supports fiat deposit on this chain.
  kado?: {
    network: string
  }
  indexes: {
    search: string
    featured: string
  }
  explorerUrlTemplates: {
    tx: string
    gov: string
    govProp: string
    wallet: string
  }
  codeIds: CodeIdConfig
  polytone?: PolytoneConfig
}

export type SupportedChain = SupportedChainConfig & {
  chain: Chain
}

export type CodeIdConfig = {
  // https://github.com/CosmWasm/cw-plus
  Cw4Group: number
  // https://github.com/CosmWasm/cw-nfts
  Cw721Base?: number

  // https://github.com/DA0-DA0/dao-contracts
  CwPayrollFactory: number
  CwTokenSwap: number
  CwTokenfactoryIssuer: number
  CwVesting: number
  DaoCore: number
  DaoMigrator: number
  DaoPreProposeMultiple: number
  DaoPreProposeSingle: number
  DaoProposalMultiple: number
  DaoProposalSingle: number
  DaoVotingCw4: number
  DaoVotingCw721Staked: number
  DaoVotingTokenStaked: number
  // v2.1.0 and below, for migrating v1 to v2 DAOs
  Cw20Stake?: number
  DaoVotingCw20Staked?: number
}

export type PolytoneConnection = {
  // Contract address of note on the local/current chain.
  note: string
  // Contract address of the note's listener on the local/current chain.
  listener: string
  // Contract address of the note's voice on the remote chain.
  voice: string
  // IBC connection IDs
  localConnection: string
  remoteConnection: string
  // IBC channel IDs
  localChannel: string
  remoteChannel: string
  // Whether or not the user needs to self-relay an execution. This should be
  // true if no relayers are running on the established connection. If using an
  // existing active connection, the relayers will automatically perform the
  // relay.
  needsSelfRelay?: boolean
}

// Map chain ID to polytone connection information.
export type PolytoneConfig = Record<string, PolytoneConnection>

export type WithChainId<T> = T & {
  chainId: string
}

export type DecodedStargateMsg<Value = any> = {
  stargate: {
    typeUrl: string
    value: Value
  }
}
