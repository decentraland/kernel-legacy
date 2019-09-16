import { PositionReport } from './types/PositionReport'

export function marshalPositionReport(positionReport: PositionReport): number[7] {
  const p = positionReport.position
  const q = positionReport.quaternion
  return [p.x, p.y, p.z, q.x, q.y, q.z, q.w]
}
