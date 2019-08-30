import { Vector2 } from '@dcl/utils'
import { calculateCachedDeltas, cachedDeltas } from './calculateCachedDeltas'

export function parcelsInScope(radius: number, position: Vector2): string[] {
  const result: string[] = []
  let length = cachedDeltas.length
  if (!length) {
    calculateCachedDeltas(radius)
    length = cachedDeltas.length
  }
  for (let i = 0; i < length; i++) {
    result.push(`${position.x + cachedDeltas[i].x},${position.y + cachedDeltas[i].y}`)
  }
  return result
}
