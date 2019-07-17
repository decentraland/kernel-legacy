import { Vector3 } from '../math/Vector3'

export function isEqual(a: Vector3, b: Vector3) {
  return a.x === b.x && a.y === b.y && a.z === b.z
}
