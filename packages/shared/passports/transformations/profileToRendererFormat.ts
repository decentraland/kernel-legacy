import { Profile } from '../types'
import { ProfileForRenderer } from 'decentraland-ecs/src'
import { convertToRGBObject } from './convertToRGBObject'
import { dropDeprecatedWearables } from './processServerProfile'
export function profileToRendererFormat(profile: Profile): ProfileForRenderer {
  const snapshots = profile.snapshots
    ? {
        face: profile.snapshots.face.replace('|', '%7C'),
        body: profile.snapshots.body.replace('|', '%7C')
      }
    : {
        face: '',
        body: ''
      }
  return {
    ...profile,
    snapshots,
    avatar: {
      ...profile.avatar,
      wearables: profile.avatar.wearables.filter(dropDeprecatedWearables),
      eyeColor: convertToRGBObject(profile.avatar.eyeColor),
      hairColor: convertToRGBObject(profile.avatar.hairColor),
      skinColor: convertToRGBObject(profile.avatar.skinColor)
    }
  }
}
