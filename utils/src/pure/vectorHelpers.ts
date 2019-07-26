import { MVector3 } from '../math/MVector3'
import { Vector3, Vector2 } from '../Vector'

export function isEqual2(a: Vector2, b: Vector2) {
  return a.x === b.x && a.y === b.y
}

export function isEqual(a: MVector3 | Vector3, b: MVector3 | Vector3) {
  return a.x === b.x && a.y === b.y && a.z === b.z
}
