import { Profile } from '../types'
import { ProfileForRenderer } from 'decentraland-ecs/src'
import { convertToRGBObject } from './convertToRGBObject'
export function profileToRendererFormat(profile: Profile): ProfileForRenderer {
  return {
    ...profile,
    avatar: {
      ...profile.avatar,
      eyeColor: convertToRGBObject(profile.avatar.eyeColor),
      hairColor: convertToRGBObject(profile.avatar.hairColor),
      skinColor: convertToRGBObject(profile.avatar.skinColor)
    }
  }
}
