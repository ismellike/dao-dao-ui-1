import { ImageRounded, PeopleAltOutlined } from '@mui/icons-material'

import { DaoTabId, VotingModuleAdapter } from '@dao-dao/types'
import { DAO_VOTING_CW721_STAKED_CONTRACT_NAMES } from '@dao-dao/utils'

import {
  MembersTab,
  NftCollectionTab,
  ProfileCardMemberInfo,
} from './components'
import {
  useCommonGovernanceTokenInfo,
  useDaoInfoBarItems,
  useProfileNewProposalCardAddresses,
} from './hooks'

export const DaoVotingCw721StakedAdapter: VotingModuleAdapter = {
  id: 'DaoVotingCw721Staked',
  contractNames: DAO_VOTING_CW721_STAKED_CONTRACT_NAMES,

  load: () => ({
    // Hooks
    hooks: {
      useDaoInfoBarItems,
      useProfileNewProposalCardAddresses,
      useCommonGovernanceTokenInfo,
    },

    // Components
    components: {
      extraTabs: [
        {
          id: DaoTabId.Members,
          labelI18nKey: 'title.members',
          Component: MembersTab,
          Icon: PeopleAltOutlined,
        },
        {
          id: DaoTabId.Collection,
          labelI18nKey: 'title.nftCollection',
          Component: NftCollectionTab,
          Icon: ImageRounded,
        },
      ],
      ProfileCardMemberInfo,
    },

    // Functions
    fields: {
      actionCategoryMakers: [],
    },
  }),
}
