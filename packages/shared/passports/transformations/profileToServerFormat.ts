import { analizeColorPart } from './analizeColorPart'
import { isValidBodyShape } from './isValidBodyShape'
export function ensureServerFormat(avatar: any, currentVersion: number) {
  const eyes = analizeColorPart(avatar, 'eyeColor', 'eyes')
  const hair = analizeColorPart(avatar, 'hairColor', 'hair')
  const skin = analizeColorPart(avatar, 'skin', 'skinColor')
  if (
    !avatar.wearables ||
    !Array.isArray(avatar.wearables) ||
    !avatar.wearables.reduce(
      (prev: boolean, next: any) => prev && typeof next === 'string' && next.startsWith('dcl://'),
      true
    )
  ) {
    throw new Error('Invalid Wearables array! Received: ' + JSON.stringify(avatar))
  }
  if (!avatar.bodyShape || !isValidBodyShape(avatar.bodyShape)) {
    throw new Error('Invalid BodyShape! Received: ' + JSON.stringify(avatar))
  }
  return {
    bodyShape: avatar.bodyShape,
    eyes,
    hair,
    skin,
    wearables: avatar.wearables,
    version: currentVersion + 1
  }
}
