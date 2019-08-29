import { ChatData, Category } from '@dcl/protos'

import { WorldInstanceConnection } from '../worldInstanceConnection'
import { sendTopicMessage } from './topic'

export function sendParcelSceneCommsMessage(comms: WorldInstanceConnection, sceneId: string, message: string) {
  const topic = sceneId

  // TODO: create its own class once we get the .proto file
  const d = new ChatData()
  d.setCategory(Category.SCENE_MESSAGE)
  d.setTime(Date.now())
  d.setMessageId(sceneId)
  d.setText(message)

  return sendTopicMessage(comms, true, topic, d)
}
