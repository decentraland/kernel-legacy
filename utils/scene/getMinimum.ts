import { Coordinate } from './SceneManifestTypes'
export function getMinimum(coords: Coordinate[]) {
  return coords.sort((a, b) => (a.x > b.x ? 1 : a.x === b.x ? a.y - b.y : -1))[0]
}
