import {
  CONFIGURE_DOWNLOAD_SERVER,
  FORGET_POSITION,
  PositionToSceneIdAction,
  SET_POSITION_AS_EMPTY,
  SET_POSITION_AS_ERROR,
  SET_POSITION_AS_LOADING,
  SET_POSITION_AS_RESOLVED
} from './actions'
import { PositionToSceneIdState } from './types'

export const INITIAL_POSITION_TO_SCENEID_STATE: PositionToSceneIdState = {
  downloadServer: '',
  positionToScene: {},
  sceneIdToPositions: {}
}

function setIn<T>(thing: Record<string, T>, filter: string[], value: T) {
  return filter.reduce((cumm, name) => ({ ...cumm, [name]: value }), thing)
}

export function positionToSceneIdReducer(
  state?: PositionToSceneIdState,
  action?: PositionToSceneIdAction
): PositionToSceneIdState {
  if (!state) {
    return INITIAL_POSITION_TO_SCENEID_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case SET_POSITION_AS_LOADING:
      return {
        ...state,
        positionToScene: setIn(state.positionToScene, [action.payload.position], 'loading')
      }
    case SET_POSITION_AS_EMPTY:
      return {
        ...state,
        positionToScene: setIn(state.positionToScene, action.payload.positions, 'empty')
      }
    case SET_POSITION_AS_ERROR:
      return {
        ...state,
        positionToScene: setIn(state.positionToScene, action.payload.positions, 'error')
      }
    case SET_POSITION_AS_RESOLVED:
      return {
        ...state,
        positionToScene: setIn(state.positionToScene, action.payload.positions, action.payload.sceneId),
        sceneIdToPositions: setIn(state.sceneIdToPositions, [action.payload.sceneId], action.payload.positions)
      }
    case FORGET_POSITION:
      return {
        ...state,
        positionToScene: setIn(state.positionToScene, action.payload.positions, undefined)
      }
    case CONFIGURE_DOWNLOAD_SERVER:
      return {
        ...state,
        downloadServer: action.payload.downloadServer
      }
    default:
      return state
  }
}
