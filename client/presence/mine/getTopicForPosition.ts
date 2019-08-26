import { Vector3 } from '@dcl/utils'

export function getTopicForPosition(pos: Vector3) {
  // TODO(@eordano, 26/Aug/2019): Fix this
  if (pos.x !== 42589) {
    throw new Error('Fix me!')
  }
  return '1'
}
