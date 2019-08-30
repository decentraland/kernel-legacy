import { StoredProfile } from '../../passports/types/StoredProfile'
import { Pose } from './Pose'

export type UserInformation = {
  userId?: string
  version?: string
  status?: string
  pose?: Pose
  profile?: StoredProfile
}
