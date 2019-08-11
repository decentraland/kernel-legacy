import { Color4 } from '@dcl/utils'
import { Vector3 } from '@dcl/utils'
import { Quaternion } from '@dcl/utils'

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
  email: string
  avatar: StoredAvatar
  description: string
  created_at: number
  updated_at: number
  version: string
}

export type StoredAvatar = {
  baseUrl: string
  wearables: Wearable[]
  bodyShape: Wearable
  skin: { color: Color4 }
  hair: { color: Color4 }
  eyes: {
    texture: string
    mask?: string
    color?: Color4
  }
  eyebrows: {
    texture: string
  }
  mouth: {
    texture: string
  }
  snapshots: {
    body: string
    face: string
  }
}

export type ResolvedProfile = {
  userId: string
  name: string
  email: string
  avatar: {
    skin: { color: Color4 }
    hair: { color: Color4 }
    eyes: { color: Color4 }
    bodyShape: AvatarAsset
    wearables: AvatarAsset[]
    snapshots: {
      body: string
      face: string
    }
  }
  description: string
  created_at: number
  updated_at: number
  version: string
}

export type AvatarAsset = {
  thumbnail: string
  contents: Array<{
    file: string
    name: string
  }>
  path: string
  id: string
  name: string
  tags: string[]
  category: string
  i18n: { [language: string]: string }
  main: Array<{
    type: string
    model: string
  }>
}

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
