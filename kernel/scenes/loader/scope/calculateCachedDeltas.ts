import { squareAndSum } from './squareAndSum'
import { Vector2 } from '@dcl/utils'

export const cachedDeltas: Vector2[] = []

export function calculateCachedDeltas(radius: number) {
  const squaredRadius = radius * radius
  for (let x = -radius; x <= radius; x++) {
    for (let y = -radius; y <= radius; y++) {
      if (x * x + y * y <= squaredRadius) {
        cachedDeltas.push({ x, y })
      }
    }
  }
  cachedDeltas.sort((a, b) => squareAndSum(a.x, a.y) - squareAndSum(b.x, b.y))
}
