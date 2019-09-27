import { Profile } from '../types'
import { ProfileForRenderer } from 'decentraland-ecs/src'
import { convertToRGBObject } from './convertToRGBObject'
import { dropDeprecatedWearables } from './processServerProfile'
export function profileToRendererFormat(profile: Profile): ProfileForRenderer {
  const snapshots = profile.snapshots || { face: '', body: '' }
  snapshots.face = snapshots.face.replace('|', '%7C')
  snapshots.body = snapshots.body.replace('|', '%7C')

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
