import { Category, ProfileData } from '@dcl/protos'
import { getTopicForPosition } from '../../presence/mine/getTopicForPosition'
import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { sendTopicIdentityMessage } from './topicIdentity'

export function sendProfileMessage(comms: ProtocolConnection, currentPosition: string, profileVersion: string) {
  const d = new ProfileData()
  d.setCategory(Category.PROFILE)
  d.setTime(Date.now())
  if (profileVersion !== undefined && profileVersion !== null) {
    d.setProfileVersion(profileVersion)
  }
  const topic = getTopicForPosition(currentPosition)

  return sendTopicIdentityMessage(comms, true, topic, d)
}
