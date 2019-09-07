import { Category, PositionData } from '@dcl/protos'

import { Pose } from '../types/Pose'
import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { sendTopicMessage } from './topic'

export function sendPosition(comms: ProtocolConnection, topic: string, p: Pose) {
  const d = new PositionData()
  d.setCategory(Category.POSITION)
  d.setTime(Date.now())
  d.setPositionX(p[0])
  d.setPositionY(p[1])
  d.setPositionZ(p[2])
  d.setRotationX(p[3])
  d.setRotationY(p[4])
  d.setRotationZ(p[5])
  d.setRotationW(p[6])

  const unreliable = false
  return sendTopicMessage(comms, unreliable, topic, d)
}
