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
  id: string
  version: string
  name: string
  description: string
  age: number
  skin: { color: RGB }
  hair: { color: RGB }
  eyes: FaceAsset & {
    color: RGB
  }
  eyebrow: FaceAsset
  mouth: FaceAsset
  bodyShape: Mappeable
  wearables: Weareable[]
}
