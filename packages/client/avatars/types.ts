import { Color3 } from '@dcl/utils/dist/math/Color3'
import { Vector3 } from '@dcl/utils/dist/Vector'
import { Quaternion } from '@dcl/utils/dist/math/Quaternion'

export type AssetNameAndHash = { name: string; hash: string }

export type Wearable = string
export type ResolvedWearable = {
  id: string
  main: string | Record<string, AssetNameAndHash>
  contentMappings: []
}

export type StoredProfile = {
  userId: string
  name: string
  bio: string
  bodyType: string
  wearables: Wearable[]
  bodyColor: Color3
  eyeColor: Color3
  hairColor: Color3
}

export type ProfileWithResolvedAssets = {
  userId: string
}

export type InWorldAvatar = {
  fullProfile: ProfileWithResolvedAssets

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