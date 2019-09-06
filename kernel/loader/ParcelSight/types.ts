import { Vector2 } from '@dcl/utils'

export interface ParcelSightState {
  currentPosition?: Vector2
  isTargetPlaced: boolean
  currentlySightedList: string[]
  currentlySightedMap: Record<string, Boolean>
  delta: DeltaParcelSightSeeingReport
  lineOfSightRadius: number
}

export interface RootParcelSightState {
  parcelSight: ParcelSightState
}

export type DeltaParcelSightSeeingReport = {
  sighted: string[]
  lostSight: string[]
  currentlyInSight: string[]
}

export type MapPositionToBoolean = { [pos: string]: boolean }
