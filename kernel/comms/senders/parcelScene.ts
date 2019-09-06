import { ChatData, Category } from '@dcl/protos'

import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { sendTopicMessage } from './topic'

export function sendParcelSceneMessage(comms: ProtocolConnection, sceneId: string, message: string) {
  const topic = sceneId

  const d = new ChatData()
  d.setCategory(Category.SCENE_MESSAGE)
  d.setTime(Date.now())
  d.setMessageId(sceneId)
  d.setText(message)

  return sendTopicMessage(comms, true, topic, d)
}
