import { action } from 'typesafe-actions'
import { Vector2 } from '@dcl/utils'

export interface ParcelSightState {
  currentPosition?: Vector2
  isTargetPlaced: boolean
  currentlySightedList: string[]
  currentlySightedMap: Record<string, Boolean>
  delta: DeltaParcelSightSeeingReport
  lineOfSightRadius: number
}

export type DeltaParcelSightSeeingReport = {
  sighted: string[]
  lostSight: string[]
  currentlyInSight: string[]
}

export type MapPositionToBoolean = { [pos: string]: boolean }

export const SET_POSITION = 'Set Position'
export const setPosition = (position: Vector2) => action(SET_POSITION, position)
export type SetPositionAction = ReturnType<typeof setPosition>

export const CONFIGURE_LOS = 'Configure Line of Sight Radius'
export const configureLineOfSightRadius = (lineOfSightRadius: number) => action(CONFIGURE_LOS, lineOfSightRadius)
export type ConfigureLineOfSightRadiusAction = ReturnType<typeof configureLineOfSightRadius>

export type ParcelSightAction = SetPositionAction | ConfigureLineOfSightRadiusAction
