import { CoordinateDefinition } from './types'
export function parseCoordinate(coord: CoordinateDefinition) {
  if (typeof coord === 'string') {
    const [x, y] = coord.split(',').map(parseInt)
    return { x, y }
  }
  return coord
}
