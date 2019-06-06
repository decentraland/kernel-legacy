import { Vector2Component } from 'atomicHelpers/landHelpers'

export interface ParcelConfigurationOptions {
  lineOfSightRadius: number
}

export function squareAndSum(a: number, b: number) {
  return a * a + b * b
}

const cachedDeltas: Vector2Component[] = []

export function parcelsInScope(config: ParcelConfigurationOptions, position: Vector2Component): string[] {
  const result: string[] = []
  if (!cachedDeltas.length) {
    const squaredRadius = config.lineOfSightRadius * config.lineOfSightRadius
    for (let x = -config.lineOfSightRadius; x <= config.lineOfSightRadius; x++) {
      for (let y = -config.lineOfSightRadius; y <= config.lineOfSightRadius; y++) {
        if (x * x + y * y < squaredRadius) {
          cachedDeltas.push({ x, y })
        }
      }
    }
    cachedDeltas.sort((a, b) => squareAndSum(a.x, a.y) - squareAndSum(b.x, b.y))
  }
  for (let delta of cachedDeltas) {
    result.push(`${position.x + delta.x},${position.y + delta.y}`)
  }
  return result
}
