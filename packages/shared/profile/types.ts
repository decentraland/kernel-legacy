import { ContentMapping } from '../types'

export type RGB = {
  r: number
  g: number
  b: number
}

export type Weareable = {
  contentId: string
  category: string
  mappings: ContentMapping[]
}

export type Profile = {
  name?: string
  description?: string
  age?: number
  avatar?: {
    version: string
    id: string
    bodyShape: string
    skinColor: RGB
    hairColor: RGB
    eyeColor: RGB
    eyes: string
    eyebrow: string
    mouth: string
    wearables: Weareable[]
  }
}
