import {
  PositionToSceneIdAction,
  PositionToSceneIdState,
  SET_POSITION_AS_LOADING,
  booleanMap,
  SET_POSITION_AS_EMPTY,
  SET_POSITION_AS_ERROR,
  SET_POSITION_AS_RESOLVED,
  FORGET_POSITION
} from './PositionToSceneId.types'

export const INITIAL_POSITION_TO_SCENEID_STATE: PositionToSceneIdState = {
  loadingPositionCoordinates: {} as booleanMap,
  resolvedPositionToScene: {} as { [key: string]: string },
  errorPositions: {} as booleanMap,
  emptyPositions: {} as booleanMap
}

function setIn<T>(thing: Record<string, T>, filter: string[], value: T) {
  const result = { ...thing }
  for (let thing in filter) {
    result[thing] = value
  }
  return result
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
  var targets: string[] = []
  switch (action.type) {
    case SET_POSITION_AS_LOADING:
      // Do not overwrite coordinates that already have data
      targets = action.payload.positions.filter(
        position =>
          !state.resolvedPositionToScene[position] && !state.errorPositions[position] && !state.emptyPositions[position]
      )
      return {
        ...state,
        loadingPositionCoordinates: setIn(state.loadingPositionCoordinates, targets, true)
      }
    case SET_POSITION_AS_EMPTY:
      const loadingReset = action.payload.positions.filter(position => state.loadingPositionCoordinates[position])
      const resolvedReset = action.payload.positions.filter(position => !!state.resolvedPositionToScene[position])
      const errorReset = action.payload.positions.filter(position => !state.errorPositions[position])
      return {
        ...state,
        loadingPositionCoordinates: setIn(state.loadingPositionCoordinates, loadingReset, false),
        resolvedPositionToScene: setIn(state.resolvedPositionToScene, resolvedReset, undefined),
        emptyPositions: setIn(state.emptyPositions, action.payload.positions, undefined),
        errorPositions: setIn(state.errorPositions, errorReset, undefined)
      }
    case SET_POSITION_AS_ERROR:
      // Do not overwrite coordinates that already have data
      targets = action.payload.positions.filter(position => !state.resolvedPositionToScene[position])
      return {
        ...state,
        loadingPositionCoordinates: setIn(state.loadingPositionCoordinates, targets, undefined),
        errorPositions: setIn(state.errorPositions, targets, action.payload.error)
      }
    case SET_POSITION_AS_RESOLVED:
      return {
        ...state,
        resolvedPositionToScene: setIn(state.resolvedPositionToScene, action.payload.positions, action.payload.sceneId),
        loadingPositionCoordinates: setIn(state.loadingPositionCoordinates, action.payload.positions, undefined),
        errorPositions: setIn(state.errorPositions, action.payload.positions, undefined),
        emptyPositions: setIn(state.emptyPositions, action.payload.positions, undefined)
      }
    case FORGET_POSITION:
      return {
        ...state,
        resolvedPositionToScene: setIn(state.resolvedPositionToScene, action.payload.positions, undefined),
        loadingPositionCoordinates: setIn(state.loadingPositionCoordinates, action.payload.positions, undefined),
        errorPositions: setIn(state.errorPositions, action.payload.positions, undefined),
        emptyPositions: setIn(state.emptyPositions, action.payload.positions, undefined)
      }
    default:
      return state
  }
}
