import { StoredProfile } from '../../passports/types'
import { Pose } from './Pose'
export type UserInformation = {
  userId?: string
  version?: string
  status?: string
  pose?: Pose
  profile?: StoredProfile
}
