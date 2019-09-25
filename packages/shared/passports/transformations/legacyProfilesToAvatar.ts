import { Profile } from '../types'
import { colorString } from '../colorString'

export function fixWearableIds(wearableId: string) {
  return wearableId.replace('/male_body', '/BaseMale').replace('/female_body', '/BaseFemale')
}
export function legacyProfilesToAvatar(legacy: any): Profile {
  return {
    userId: legacy.userId,
    email: legacy.email,
    name: legacy.profile.name,
    description: legacy.profile.description,
    created_at: legacy.profile.created_at,
    updated_at: typeof legacy.updatedAt === 'string' ? parseInt(legacy.updatedAt, 10) : legacy.updatedAt,
    snapshots: legacy.snapshots,
    version: legacy.profile.avatar.version,
    avatar: {
      eyeColor: colorString(legacy.profile.avatar.eyes.color),
      hairColor: colorString(legacy.profile.avatar.hair.color),
      skinColor: colorString(legacy.profile.avatar.skin.color),
      bodyShape: fixWearableIds(legacy.profile.avatar.bodyShape),
      wearables: legacy.profile.avatar.wearables.map(fixWearableIds)
    },
    inventory: []
  }
}
