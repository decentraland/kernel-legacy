import { Vector2 } from '@dcl/utils'
import { action } from 'typesafe-actions'

export const SHOW_PARCEL_LOADING = 'Show parcel loading'
export const showParcelLoading = (position: Vector2) => action(SHOW_PARCEL_LOADING, position)
export type ShowParcelLoadingAction = ReturnType<typeof showParcelLoading>

export const HIDE_PARCEL_LOADING = 'Hide parcel loading'
export const hideParcelLoading = (position: Vector2) => action(HIDE_PARCEL_LOADING, position)
export type HideParcelLoadingAction = ReturnType<typeof hideParcelLoading>

export type ParcelLoadingActionType = ShowParcelLoadingAction | HideParcelLoadingAction
