import { Message } from 'google-protobuf'

import { TopicIdentityMessage, MessageType } from '@dcl/protos'

import { WorldInstanceConnection } from '../worldInstanceConnection'
import { SendResult } from '../types/SendResult'

export function sendTopicIdentityMessage(
  comms: WorldInstanceConnection,
  reliable: boolean,
  topic: string,
  body: Message
): SendResult {
  const encodedBody = body.serializeBinary()

  const message = new TopicIdentityMessage()
  message.setType(MessageType.TOPIC_IDENTITY)
  message.setTopic(topic)
  message.setBody(encodedBody)

  return comms.sendMessage(reliable, message)
}
