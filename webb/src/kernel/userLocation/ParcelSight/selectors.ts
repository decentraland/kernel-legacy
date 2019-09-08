import { RootParcelSightState } from './types'

export function isAnyParcelInSight(state: RootParcelSightState, parcels: string[]) {
  const currentlySighted = state.parcelSight.currentlySightedMap
  for (let parcel of parcels) {
    if (currentlySighted[parcel]) {
      return true
    }
  }
  return false
}

export function isParcelInSight(state: RootParcelSightState, parcel: string) {
  return state.parcelSight.currentlySightedMap[parcel]
}

export function getCurrentPosition(state: RootParcelSightState) {
  return state.parcelSight.isTargetPlaced ? state.parcelSight.currentPosition! : null
}

export function deltaSighted(state: RootParcelSightState) {
  return state.parcelSight.delta
}

export function newlySighted(state: RootParcelSightState) {
  return state.parcelSight.delta.sighted
}

export function allInSight(state: RootParcelSightState) {
  return state.parcelSight.currentlySightedList
}
