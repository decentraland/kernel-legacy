import { PositionReport } from '@dcl/kernel'
import { Vector3 } from '@dcl/utils'

export type MyPresenceStateProperties = {
  lastPlayerPositionReport: PositionReport
  lastPlayerPosition: Vector3
  lastTimeUpdatedUrl: number
}

export type MyPresenceActionProperties = {}
