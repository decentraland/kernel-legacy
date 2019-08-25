import { CoordinateDefinition } from './SceneManifestTypes'
export function parseCoordinate(coord: CoordinateDefinition) {
  if (typeof coord === 'string') {
    const [x, y] = coord.split(',').map((_: string) => parseInt(_, 10))
    return { x, y }
  }
  return coord
}
