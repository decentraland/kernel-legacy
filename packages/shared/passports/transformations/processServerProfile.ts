import { Profile } from '../types'
import { colorString } from './colorString'

export function fixWearableIds(wearableId: string) {
  return wearableId.replace('/male_body', '/BaseMale').replace('/female_body', '/BaseFemale')
}
export const deprecatedWearables = [
  'dcl://base-avatars/male_body',
  'dcl://base-avatars/female_body',
  'dcl://base-avatars/BaseMale',
  'dcl://base-avatars/BaseFemale',
  'dcl://base-avatars/00_EmptyEarring',
  'dcl://base-avatars/00_EmptyFacialHair',
  'dcl://base-avatars/00_bald'
]
export function dropDeprecatedWearables(wearableId: string): boolean {
  return deprecatedWearables.indexOf(wearableId) === -1
}
export function processServerProfile(userId: string, receivedProfile: any): Profile {
  const name =
    receivedProfile.name ||
    'Guest-' +
      Math.random()
        .toFixed(6)
        .substr(2)
  return {
    userId: userId,
    email: receivedProfile.email || name.toLowerCase() + '@nowhere.com',
    name: receivedProfile.name || name,
    description: receivedProfile.description || '',
    createdAt: new Date(receivedProfile.createdAt).getTime(),
    ethAddress: receivedProfile.ethAddress || 'noeth',
    updatedAt:
      typeof receivedProfile.updatedAt === 'string'
        ? new Date(receivedProfile.updatedAt).getTime()
        : receivedProfile.updatedAt,
    snapshots: receivedProfile.avatar.snapshots,
    version: receivedProfile.avatar.version || 1,
    avatar: {
      eyeColor: colorString(receivedProfile.avatar.eyes.color),
      hairColor: colorString(receivedProfile.avatar.hair.color),
      skinColor: colorString(receivedProfile.avatar.skin.color),
      bodyShape: fixWearableIds(receivedProfile.avatar.bodyShape),
      wearables: receivedProfile.avatar.wearables.map(fixWearableIds).filter(dropDeprecatedWearables)
    },
    inventory: receivedProfile.inventory || []
  }
}
