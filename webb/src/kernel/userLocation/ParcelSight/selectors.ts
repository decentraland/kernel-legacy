import { RootParcelSightState } from './types'

export function isParcelInSight(state: RootParcelSightState, parcel: string) {
  return state.parcelSight.currentlySightedMap[parcel]
}

export function getCurrentPosition(state: RootParcelSightState) {
  return state.parcelSight.isTargetPlaced ? state.parcelSight.currentPosition! : null
}

export function newlySighted(state: RootParcelSightState) {
  return state.parcelSight.delta.sighted
}

export function allInSight(state: RootParcelSightState) {
  return state.parcelSight.currentlySightedList
}
