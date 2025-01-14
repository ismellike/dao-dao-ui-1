import JSON5 from 'json5'

import { ActionBase } from '@dao-dao/stateless'
import { UnifiedCosmosMsg } from '@dao-dao/types'
import {
  ActionKey,
  ActionMatch,
  ActionOptions,
  ProcessedMessage,
} from '@dao-dao/types/actions'
import { makeCosmosMsg, maybeMakePolytoneExecuteMessages } from '@dao-dao/utils'

import { SkipGoComponent, SkipGoData, SkipGoIcon } from './Component'

export class SkipGoAction extends ActionBase<SkipGoData> {
  public readonly key = ActionKey.SkipGo
  public readonly Component = SkipGoComponent

  constructor(options: ActionOptions) {
    super(options, {
      Icon: SkipGoIcon,
      label: options.t('title.skipGo'),
      description: options.t('info.skipGoDescription'),
    })

    this._defaults = {
      chainId: options.chain.chainId,
      message: '{}',
    }
  }

  encode({
    chainId,
    message,
  }: SkipGoData): UnifiedCosmosMsg | UnifiedCosmosMsg[] {
    const msgs = [JSON5.parse(message)]
      .flat()
      .map((message) => makeCosmosMsg(message))

    return maybeMakePolytoneExecuteMessages(
      this.options.chain.chainId,
      chainId,
      msgs
    )
  }

  match(): ActionMatch {
    return false
  }

  decode(_messages: ProcessedMessage[]): SkipGoData {
    throw new Error('SkipGoAction does not support decoding')
  }
}
