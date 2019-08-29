import { Vector2 } from '@dcl/utils'
import { cachedDeltas } from './scope/calculateCachedDeltas'
import { ParcelConfigurationOptions } from '../types/ParcelConfigurationOptions'
import { calculateCachedDeltas } from './scope/calculateCachedDeltas'

export function parcelsInScope(config: ParcelConfigurationOptions, position: Vector2): string[] {
  const result: string[] = []
  let length = cachedDeltas.length
  if (!length) {
    calculateCachedDeltas(config)
    length = cachedDeltas.length
  }
  for (let i = 0; i < length; i++) {
    result.push(`${position.x + cachedDeltas[i].x},${position.y + cachedDeltas[i].y}`)
  }
  return result
}
