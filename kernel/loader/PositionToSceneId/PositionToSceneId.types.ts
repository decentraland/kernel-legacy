import { action } from 'typesafe-actions'

export type coordinateString = string
export type sceneIdString = string
export type booleanMap = Record<string, boolean>

export type PositionToSceneIdState = {
  loadingPositionCoordinates: booleanMap
  resolvedPositionToScene: Record<coordinateString, sceneIdString>
  errorPositions: Record<string, boolean>
  emptyPositions: Record<string, boolean>
}

export const SET_POSITION_AS_LOADING = 'Set positions as loading'
export const SET_POSITION_AS_RESOLVED = 'Set mappongs of positions to a sceneId'
export const SET_POSITION_AS_ERROR = 'Set positions as error'
export const SET_POSITION_AS_EMPTY = 'Set positions as empty'
export const FORGET_POSITION = 'Erase position information for parcels'

export const setPositionsAsLoading = (positions: string[]) => action(SET_POSITION_AS_LOADING, { positions })
export const setPositionsAsResolved = (positions: string[], sceneId) =>
  action(SET_POSITION_AS_RESOLVED, { positions, sceneId })
export const setPositionsAsError = (positions: string[], error: any) =>
  action(SET_POSITION_AS_ERROR, { positions, error })
export const setPositionsAsEmpty = (positions: string[]) => action(SET_POSITION_AS_EMPTY, { positions })
export const forgetPositions = (positions: string[]) => action(FORGET_POSITION, { positions })

export type SetPositionsAsLoadingAction = ReturnType<typeof setPositionsAsLoading>
export type SetPositionsAsResolvedAction = ReturnType<typeof setPositionsAsResolved>
export type SetPositionsAsEmptyAction = ReturnType<typeof setPositionsAsEmpty>
export type SetPositionsAsErrorAction = ReturnType<typeof setPositionsAsError>
export type ForgetPositionsAction = ReturnType<typeof forgetPositions>

export type PositionToSceneIdAction =
  | SetPositionsAsEmptyAction
  | SetPositionsAsErrorAction
  | SetPositionsAsLoadingAction
  | SetPositionsAsResolvedAction
  | ForgetPositionsAction
