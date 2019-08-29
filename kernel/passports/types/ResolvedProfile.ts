import { Color4 } from '@dcl/utils'
import { AvatarAsset } from './AvatarAsset'
export type ResolvedProfile = {
  userId: string
  name: string
  email: string
  avatar: {
    skin: {
      color: Color4
    }
    hair: {
      color: Color4
    }
    eyes: {
      color: Color4
    }
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
