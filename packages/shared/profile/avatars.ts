import { getProfileByUserId } from '.'
import { Wearable, AvatarShapeData } from './types'

/**
 * It retrieves and transforms DCL Profile Service object to the minimum
 * engine-needed avatar shape data schema
 * @param userId Identity service user ID
 */
export async function getAvatarById(userId: string): Promise<AvatarShapeData> {
  const { name, avatar, wearables, bodyShape } = await getProfileByUserId(userId)
  const { version, skin } = avatar

  const result: Partial<AvatarShapeData> = {
    name,
    version,
    skin,
    bodyShape
  }

  const finalWearables = []
  for (const wearable of wearables as Wearable[]) {
    if (isFaceWearable(wearable)) {
      result[wearable.category] = wearable
    } else {
      finalWearables.push(wearable)
    }
  }

  result.wearables = [...finalWearables]
  return result as AvatarShapeData
}

const faceWearables = new Set(['eyes', 'eyebrows', 'mouth'])

function isFaceWearable(wearable: Wearable): boolean {
  return faceWearables.has(wearable.category)
}
