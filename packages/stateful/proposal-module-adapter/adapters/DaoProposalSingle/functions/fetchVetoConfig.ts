import { DaoProposalSingleV2QueryClient, queryIndexer } from '@dao-dao/state'
import { Feature, FetchVetoConfig } from '@dao-dao/types'
import { ConfigResponse } from '@dao-dao/types/contracts/DaoProposalSingle.v2'
import {
  cosmWasmClientRouter,
  getRpcForChainId,
  isFeatureSupportedByVersion,
} from '@dao-dao/utils'

export const fetchVetoConfig: FetchVetoConfig = async (
  chainId,
  proposalModuleAddress,
  version
) => {
  if (!version || !isFeatureSupportedByVersion(Feature.Veto, version)) {
    return null
  }

  // Try indexer first.
  let config: ConfigResponse | undefined
  try {
    config = await queryIndexer({
      type: 'contract',
      address: proposalModuleAddress,
      formula: 'daoProposalSingle/config',
      chainId,
      required: true,
    })
  } catch (err) {
    // Ignore error.
    console.error(err)
  }

  // If indexer fails, fallback to querying chain.
  if (!config) {
    const client = new DaoProposalSingleV2QueryClient(
      await cosmWasmClientRouter.connect(getRpcForChainId(chainId)),
      proposalModuleAddress
    )

    config = await client.config()
  }

  return config?.veto ?? null
}
