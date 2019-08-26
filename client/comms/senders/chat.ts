import { ChatData, Category } from '@dcl/protos'
import { sendTopicMessage } from './topic'
import { WorldInstanceConnection } from '../worldInstanceConnection'

export function sendChatMessage(comms: WorldInstanceConnection, topic: string, messageId: string, text: string) {
  const d = new ChatData()
  d.setCategory(Category.CHAT)
  d.setTime(Date.now())
  d.setMessageId(messageId)
  d.setText(text)

  return sendTopicMessage(comms, true, topic, d)
}
