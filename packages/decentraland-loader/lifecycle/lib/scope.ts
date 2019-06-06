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
    calculateCachedDeltas(config)
  }
  for (let delta of cachedDeltas) {
    result.push(`${position.x + delta.x},${position.y + delta.y}`)
  }
  return result
}

function calculateCachedDeltas(config: ParcelConfigurationOptions) {
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
