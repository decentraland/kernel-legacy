import { ParcelSightState } from './ParcelSight.types'

export function inSight(state: ParcelSightState, parcel: string) {
  return state.currentlySightedMap[parcel]
}
