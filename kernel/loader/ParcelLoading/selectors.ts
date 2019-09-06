import { ParcelLoadingState } from './types'

export function isLoading(state: ParcelLoadingState, parcel: string) {
  return state.parcelCurrentlyLoading[parcel]
}
