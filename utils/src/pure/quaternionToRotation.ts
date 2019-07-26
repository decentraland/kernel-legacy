import { Quaternion } from '../math/Quaternion'
import { MVector3 } from '../math/MVector3'
import { RAD2DEG } from '../math'

export function quaternionToRotation(x: number, y: number, z: number, w: number) {
  const roll = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * y * y - 2 * z * z) * RAD2DEG
  const pitch = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * x * x - 2 * z * z) * RAD2DEG
  const yaw = Math.asin(2 * x * y + 2 * z * w) * RAD2DEG

  return { x: pitch, y: roll, z: yaw }
}

export function quaternionToRotationBABYLON(quat: Quaternion, rotation: MVector3) {
  const { x, y, z, w } = quat

  const roll = Math.atan2(2 * y * w - 2 * x * z, 1 - 2 * y * y - 2 * z * z) * RAD2DEG
  const pitch = Math.atan2(2 * x * w - 2 * y * z, 1 - 2 * x * x - 2 * z * z) * RAD2DEG
  const yaw = Math.asin(2 * x * y + 2 * z * w) * RAD2DEG

  rotation.x = pitch
  rotation.y = roll
  rotation.z = yaw
}
