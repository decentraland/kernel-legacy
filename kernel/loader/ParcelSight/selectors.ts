import { ParcelSightState } from './types'

export function inSight(state: ParcelSightState, parcel: string) {
  return state.currentlySightedMap[parcel]
}
