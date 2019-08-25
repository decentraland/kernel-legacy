import { squareAndSum } from './squareAndSum'
import { ParcelConfigurationOptions } from '../../types/ParcelConfigurationOptions'
import { Vector2 } from '@dcl/utils'

export const cachedDeltas: Vector2[] = []

export function calculateCachedDeltas(config: ParcelConfigurationOptions) {
  const limit = config.lineOfSightRadius
  const squaredRadius = limit * limit
  for (let x = -limit; x <= limit; x++) {
    for (let y = -limit; y <= limit; y++) {
      if (x * x + y * y <= squaredRadius) {
        cachedDeltas.push({ x, y })
      }
    }
  }
  cachedDeltas.sort((a, b) => squareAndSum(a.x, a.y) - squareAndSum(b.x, b.y))
}
