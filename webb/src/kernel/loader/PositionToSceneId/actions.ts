import { action } from 'typesafe-actions'

export const POSITION_LOADING_REQUEST = 'Position loading request'
export const SET_POSITION_AS_LOADING = 'Loading data for position...'
export const SET_POSITION_AS_RESOLVED = 'Set mappings of positions to a sceneId'
export const SET_POSITION_AS_ERROR = 'Set positions as error'
export const SET_POSITION_AS_EMPTY = 'Set positions as empty'
export const FORGET_POSITION = 'Erase position information for parcels'

export const CONFIGURE_DOWNLOAD_SERVER = 'Configure download server'

export const positionLoadRequest = (positions: string[]) => action(POSITION_LOADING_REQUEST, { positions })
export const setPositionAsLoading = (position: string) =>
  action(SET_POSITION_AS_LOADING, { position })
export const setPositionsAsResolved = (positions: string[], sceneId: string) =>
  action(SET_POSITION_AS_RESOLVED, { positions, sceneId })
export const setPositionsAsError = (positions: string[], error: any) =>
  action(SET_POSITION_AS_ERROR, { positions, error })
export const setPositionsAsEmpty = (positions: string[]) => action(SET_POSITION_AS_EMPTY, { positions })
export const forgetPositions = (positions: string[]) => action(FORGET_POSITION, { positions })
export const configureDownloadServer = (downloadServer: string) => action(CONFIGURE_DOWNLOAD_SERVER, { downloadServer })

export type PositionLoadRequest = ReturnType<typeof positionLoadRequest>
export type SetPositionAsLoadingAction = ReturnType<typeof setPositionAsLoading>
export type SetPositionsAsResolvedAction = ReturnType<typeof setPositionsAsResolved>
export type SetPositionsAsEmptyAction = ReturnType<typeof setPositionsAsEmpty>
export type SetPositionsAsErrorAction = ReturnType<typeof setPositionsAsError>
export type ForgetPositionsAction = ReturnType<typeof forgetPositions>
export type ConfigureDownloadServerAction = ReturnType<typeof configureDownloadServer>

export type PositionToSceneIdAction =
  | SetPositionsAsEmptyAction
  | SetPositionAsLoadingAction
  | SetPositionsAsErrorAction
  | PositionLoadRequest
  | SetPositionsAsResolvedAction
  | ForgetPositionsAction
  | ConfigureDownloadServerAction
