import { SubscriptionMessage, MessageType, Format } from '@dcl/protos'

import { WorldInstanceConnection } from '../../../comms/worldInstanceConnection'

export function sendUpdateSubscriptions(comms: WorldInstanceConnection, rawTopics: string) {
  if (!comms.connection.hasReliableChannel) {
    return
  }
  const subscriptionMessage = new SubscriptionMessage()
  subscriptionMessage.setType(MessageType.SUBSCRIPTION)
  subscriptionMessage.setFormat(Format.PLAIN)
  // TODO: use TextDecoder instead of Buffer, it is a native browser API, works faster
  subscriptionMessage.setTopics(Buffer.from(rawTopics, 'utf8'))
  const bytes = subscriptionMessage.serializeBinary()
  comms.connection.sendReliable(bytes)
}
