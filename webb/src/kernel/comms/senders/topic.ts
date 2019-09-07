import { Message } from 'google-protobuf'

import { TopicMessage, MessageType } from '@dcl/protos'

import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { SendResult } from '../types/SendResult'

export function sendTopicMessage(
  comms: ProtocolConnection,
  reliable: boolean,
  topic: string,
  body: Message
): SendResult {
  const encodedBody = body.serializeBinary()

  const message = new TopicMessage()
  message.setType(MessageType.TOPIC)
  message.setTopic(topic)
  message.setBody(encodedBody)

  return comms.sendMessage(reliable, message)
}
