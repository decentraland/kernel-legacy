import { PositionReport } from '../../presence'
import { WorldInstanceConnection } from '../worldInstanceConnection'
import { PositionData, Category } from '@dcl/protos'
import { parcelLimits, worldToGrid } from '@dcl/utils'

export function positionHash(parcel: { x: number; y: number }) {
  const x = (parcel.x + parcelLimits.maxParcelX) >> 2
  const y = (parcel.y + parcelLimits.maxParcelZ) >> 2
  return `${x}:${y}`
}

export function sendPosition(comms: WorldInstanceConnection, p: PositionReport) {
  const parcelCoordinates = { x: 0, y: 0 }
  worldToGrid({ x: p[0], y: p[1], z: p[2] }, parcelCoordinates as any)
  const topic = positionHash(parcelCoordinates)

  const d = new PositionData()
  d.setCategory(Category.POSITION)
  d.setTime(Date.now())
  d.setPositionX(p[0])
  d.setPositionY(p[1])
  d.setPositionZ(p[2])
  d.setRotationX(p[3])
  d.setRotationY(p[4])
  d.setRotationZ(p[5])
  d.setRotationW(p[6])

  comms.sendTopicMessage(false, topic, d)
  // if (this.stats) {
  //   this.stats.position.incrementSent(1, r.bytesSize)
  // }
}
