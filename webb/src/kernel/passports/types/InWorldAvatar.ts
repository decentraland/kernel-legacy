import { Vector3, Quaternion } from '@dcl/utils'
import { ResolvedProfile } from './ResolvedProfile'
export type InWorldAvatar = {
  profile: ResolvedProfile
  lifecycleStatus:
    | 'Not initialized'
    | 'Authenticated'
    | 'Loading'
    | 'Ready'
    | 'Invisible'
    | 'Error'
    | 'Banned/Unavailable'
  position: Vector3
  rotation: Quaternion
  currentScene: string
}
