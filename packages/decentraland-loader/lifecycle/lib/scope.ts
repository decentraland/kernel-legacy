import { Vector2Component } from 'atomicHelpers/landHelpers'

export interface ParcelConfigurationOptions {
  lineOfSightRadius: number
}

export function squareDiff(a: number, b: number) {
  return a * a + b * b
}

export function parcelsInScope(config: ParcelConfigurationOptions, position: Vector2Component): string[] {
  const result: string[] = []
  const squareRadius = config.lineOfSightRadius * config.lineOfSightRadius
  for (const x = position.x - config.lineOfSightRadius; x <= position.x + config.lineOfSightRadius; x++) {
    for (const y = position.y - config.lineOfSightRadius; y <= position.y + config.lineOfSightRadius; y++) {
      if (squareDiff(x - position.x, y - position.y) <= squareRadius) {
        result.push(`${x},${y}`)
      }
    }
  }
  return result
}
