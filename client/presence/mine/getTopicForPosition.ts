import { Vector3, parcelLimits } from '@dcl/utils'

export function getTopicForPosition(position: Vector3) {
  // TODO(@eordano, 26/Aug/2019): Fix this
  const x = (position.x + parcelLimits.maxParcelX) >> 2
  const z = (position.z + parcelLimits.maxParcelZ) >> 2
  return `${x}:${z}`
}
