import { ContentMapping } from '../types'

export type RGB = {
  r: number
  g: number
  b: number
}

export type AssetWithColor = {
  color: RGB
}

export type AssetWithTexture = {
  texture: string
}

export type AssetWithMappings = {
  main: string
  contents: ContentMapping[]
}

export type Wearable = AssetWithMappings & {
  category: string
}

export type Profile = {
  name: string
  description: string
  created_at: number
  avatar: {
    version: number
    skin: AssetWithColor
    hair: AssetWithColor
    eyes: AssetWithColor
  }
  bodyShape: string
  wearables: string[]
}

export type ProfileWithMappings = Profile & {
  bodyShape: AssetWithMappings
  wearables: Wearable[]
}

export type AvatarShapeData = {
  name: string
  version: number
  skin: AssetWithColor
  hair: AssetWithColor
  eyes: AssetWithTexture & {
    color?: RGB
    mask?: string
  }
  eyebrows: AssetWithTexture
  mouth: AssetWithTexture
  bodyShape: AssetWithMappings
  wearables: Wearable[]
}
