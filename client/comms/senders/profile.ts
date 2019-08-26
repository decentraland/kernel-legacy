import { ProfileData, Category } from '@dcl/protos'

import { UserInformation } from '../types/UserInformation'
import { WorldInstanceConnection } from '../worldInstanceConnection'
import { sendTopicIdentityMessage } from './topicIdentity'

export function sendProfileMessage(
  comms: WorldInstanceConnection,
  topic: string,
  p: Position,
  userProfile: UserInformation
) {
  const d = new ProfileData()
  d.setCategory(Category.PROFILE)
  d.setTime(Date.now())
  userProfile.version && d.setProfileVersion(userProfile.version)

  return sendTopicIdentityMessage(comms, true, topic, d)
}
