import { Coin, StdFee } from '@cosmjs/amino'
import {
  CosmWasmClient,
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate'

import { Binary, Duration, Uint128 } from '@dao-dao/types/contracts/common'
import {
  ClaimsResponse,
  GetConfigResponse,
  GetHooksResponse,
  ListStakersResponse,
  StakedBalanceAtHeightResponse,
  StakedValueResponse,
  TotalStakedAtHeightResponse,
  TotalValueResponse,
} from '@dao-dao/types/contracts/Cw20Stake'
import { CHAIN_GAS_MULTIPLIER } from '@dao-dao/utils'

export interface Cw20StakeReadOnlyInterface {
  contractAddress: string
  stakedBalanceAtHeight: ({
    address,
    height,
  }: {
    address: string
    height?: number
  }) => Promise<StakedBalanceAtHeightResponse>
  totalStakedAtHeight: ({
    height,
  }: {
    height?: number
  }) => Promise<TotalStakedAtHeightResponse>
  stakedValue: ({
    address,
  }: {
    address: string
  }) => Promise<StakedValueResponse>
  totalValue: () => Promise<TotalValueResponse>
  getConfig: () => Promise<GetConfigResponse>
  claims: ({ address }: { address: string }) => Promise<ClaimsResponse>
  getHooks: () => Promise<GetHooksResponse>
  listStakers: ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }) => Promise<ListStakersResponse>
}
export class Cw20StakeQueryClient implements Cw20StakeReadOnlyInterface {
  client: CosmWasmClient
  contractAddress: string

  constructor(client: CosmWasmClient, contractAddress: string) {
    this.client = client
    this.contractAddress = contractAddress
    this.stakedBalanceAtHeight = this.stakedBalanceAtHeight.bind(this)
    this.totalStakedAtHeight = this.totalStakedAtHeight.bind(this)
    this.stakedValue = this.stakedValue.bind(this)
    this.totalValue = this.totalValue.bind(this)
    this.getConfig = this.getConfig.bind(this)
    this.claims = this.claims.bind(this)
    this.getHooks = this.getHooks.bind(this)
    this.listStakers = this.listStakers.bind(this)
  }

  stakedBalanceAtHeight = async ({
    address,
    height,
  }: {
    address: string
    height?: number
  }): Promise<StakedBalanceAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      staked_balance_at_height: {
        address,
        height,
      },
    })
  }
  totalStakedAtHeight = async ({
    height,
  }: {
    height?: number
  }): Promise<TotalStakedAtHeightResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_staked_at_height: {
        height,
      },
    })
  }
  stakedValue = async ({
    address,
  }: {
    address: string
  }): Promise<StakedValueResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      staked_value: {
        address,
      },
    })
  }
  totalValue = async (): Promise<TotalValueResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      total_value: {},
    })
  }
  getConfig = async (): Promise<GetConfigResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_config: {},
    })
  }
  claims = async ({
    address,
  }: {
    address: string
  }): Promise<ClaimsResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      claims: {
        address,
      },
    })
  }
  getHooks = async (): Promise<GetHooksResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      get_hooks: {},
    })
  }
  listStakers = async ({
    limit,
    startAfter,
  }: {
    limit?: number
    startAfter?: string
  }): Promise<ListStakersResponse> => {
    return this.client.queryContractSmart(this.contractAddress, {
      list_stakers: {
        limit,
        start_after: startAfter,
      },
    })
  }
}
export interface Cw20StakeInterface extends Cw20StakeReadOnlyInterface {
  contractAddress: string
  sender: string
  receive: (
    {
      amount,
      msg,
      sender,
    }: {
      amount: Uint128
      msg: Binary
      sender: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  unstake: (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  claim: (
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  updateConfig: (
    {
      duration,
      manager,
      owner,
    }: {
      duration?: Duration
      manager?: string
      owner?: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  addHook: (
    {
      addr,
    }: {
      addr: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
  removeHook: (
    {
      addr,
    }: {
      addr: string
    },
    fee?: number | StdFee | 'auto',
    memo?: string,
    funds?: Coin[]
  ) => Promise<ExecuteResult>
}
export class Cw20StakeClient
  extends Cw20StakeQueryClient
  implements Cw20StakeInterface
{
  client: SigningCosmWasmClient
  sender: string
  contractAddress: string

  constructor(
    client: SigningCosmWasmClient,
    sender: string,
    contractAddress: string
  ) {
    super(client, contractAddress)
    this.client = client
    this.sender = sender
    this.contractAddress = contractAddress
    this.receive = this.receive.bind(this)
    this.unstake = this.unstake.bind(this)
    this.claim = this.claim.bind(this)
    this.updateConfig = this.updateConfig.bind(this)
    this.addHook = this.addHook.bind(this)
    this.removeHook = this.removeHook.bind(this)
  }

  receive = async (
    {
      amount,
      msg,
      sender,
    }: {
      amount: Uint128
      msg: Binary
      sender: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        receive: {
          amount,
          msg,
          sender,
        },
      },
      fee,
      memo,
      funds
    )
  }
  unstake = async (
    {
      amount,
    }: {
      amount: Uint128
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        unstake: {
          amount,
        },
      },
      fee,
      memo,
      funds
    )
  }
  claim = async (
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        claim: {},
      },
      fee,
      memo,
      funds
    )
  }
  updateConfig = async (
    {
      duration,
      manager,
      owner,
    }: {
      duration?: Duration
      manager?: string
      owner?: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        update_config: {
          duration,
          manager,
          owner,
        },
      },
      fee,
      memo,
      funds
    )
  }
  addHook = async (
    {
      addr,
    }: {
      addr: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        add_hook: {
          addr,
        },
      },
      fee,
      memo,
      funds
    )
  }
  removeHook = async (
    {
      addr,
    }: {
      addr: string
    },
    fee: number | StdFee | 'auto' = CHAIN_GAS_MULTIPLIER,
    memo?: string,
    funds?: Coin[]
  ): Promise<ExecuteResult> => {
    return await this.client.execute(
      this.sender,
      this.contractAddress,
      {
        remove_hook: {
          addr,
        },
      },
      fee,
      memo,
      funds
    )
  }
}
