import { squareAndSum } from './squareAndSum'
import { Vector2 } from '@dcl/utils'

export const cachedDeltas: Vector2[][] = []

export function calculateCachedDeltas(radius: number) {
  cachedDeltas[radius] = []
  const squaredRadius = radius * radius
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      if (x * x + y * y <= squaredRadius) {
        cachedDeltas[radius].push({ x, y })
      }
    }
  }
  cachedDeltas[radius].sort((a, b) => squareAndSum(a.x, a.y) - squareAndSum(b.x, b.y))
}
