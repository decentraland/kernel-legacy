import { encodeParcelPosition } from '@dcl/utils'

import { ParcelLoadingState } from './types'
import { ParcelLoadingActionType, SHOW_PARCEL_LOADING } from './actions'

export const INITIAL_PARCEL_LOADING_STATE: ParcelLoadingState = {
  parcelCurrentlyLoading: {}
}

export function parcelLoadingReducer(state?: ParcelLoadingState, action?: ParcelLoadingActionType): ParcelLoadingState {
  if (!state) {
    return INITIAL_PARCEL_LOADING_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case SHOW_PARCEL_LOADING:
      return {
        parcelCurrentlyLoading: { ...state.parcelCurrentlyLoading, [encodeParcelPosition(action.payload)]: true }
      }
    default:
      return state
  }
}
