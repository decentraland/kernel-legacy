import { Color4 } from '@dcl/utils'
import { Wearable } from './Wearable'
export type StoredAvatar = {
  baseUrl: string
  wearables: Wearable[]
  bodyShape: Wearable
  skin: {
    color: Color4
  }
  hair: {
    color: Color4
  }
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
