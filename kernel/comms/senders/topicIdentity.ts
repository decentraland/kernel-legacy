import { Message } from 'google-protobuf'

import { TopicIdentityMessage, MessageType } from '@dcl/protos'

import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { SendResult } from '../types/SendResult'

export function sendTopicIdentityMessage(
  comms: ProtocolConnection,
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
