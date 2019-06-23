import { ContentMapping } from '../types'

export type RGB = {
  r: number
  g: number
  b: number
}

export type Mappeable = {
  contentName: string
  mappings: ContentMapping[]
}

export type Weareable = Mappeable & {
  category: string
}

export type FaceAsset = {
  mask: string
  texture: string
}

export type Profile = {
  name?: string
  description?: string
  age?: number
  avatar?: {
    version: string
    id: string
    skinColor: { color: RGB }
    hairColor: { color: RGB }
    eyes: FaceAsset & {
      color: RGB
    }
    eyebrow: FaceAsset
    mouth: FaceAsset
    bodyShape: Mappeable
    wearables: Weareable[]
  }
}
