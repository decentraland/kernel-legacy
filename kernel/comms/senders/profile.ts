import { ProfileData, Category } from '@dcl/protos'

import { ProtocolConnection } from '../brokers/ProtocolConnection'
import { sendTopicIdentityMessage } from './topicIdentity'
import { StoredProfile } from '../../passports/types'

export function sendProfileMessage(comms: ProtocolConnection, topic: string, p: Position, userProfile: StoredProfile) {
  const d = new ProfileData()
  d.setCategory(Category.PROFILE)
  d.setTime(Date.now())
  userProfile.version && d.setProfileVersion(userProfile.version)

  return sendTopicIdentityMessage(comms, true, topic, d)
}
