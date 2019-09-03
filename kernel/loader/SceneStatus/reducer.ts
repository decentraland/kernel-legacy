import {
  SceneLifeCyleState,
  SceneLifeCycleAction,
  SCENE_START,
  SCENE_SCRIPT_SENT_AWAKE,
  SCENE_SCRIPT_AWAKE_TIMEOUT,
  SCENE_RENDERER_SENT_START_SIGNAL,
  SCENE_RUNNING,
  SCENE_RENDERER_FATAL_ERROR,
  SCENE_SCRIPT_SOURCED_FATAL_ERROR
} from './types'
import { booleanMap } from '../PositionToSceneId/types'

export const INITIAL_SCENE_LIFECYCLE_STATUS: SceneLifeCyleState = {
  loading: {} as booleanMap,
  awake: {} as booleanMap,
  started: {} as booleanMap,
  running: {} as booleanMap,
  error: {} as booleanMap
}

type KEY = 'loading' | 'awake' | 'started' | 'running' | 'error'

function transition(state: SceneLifeCyleState, sceneId: string, from: KEY, to: KEY) {
  return {
    ...state,
    [from]: { ...state[from], [sceneId]: undefined },
    [to]: { ...state[to], [sceneId]: true }
  }
}

export function sceneLifeCycleReducer(state?: SceneLifeCyleState, action?: SceneLifeCycleAction): SceneLifeCyleState {
  if (!state) {
    return INITIAL_SCENE_LIFECYCLE_STATUS
  }
  if (!action) {
    return state
  }
  const sceneId = action.payload.sceneId
  switch (action.type) {
    case SCENE_START:
      return { ...state, loading: { ...state.loading, [action.payload.sceneId]: true } }
    case SCENE_SCRIPT_SENT_AWAKE:
      return transition(state, action.payload.sceneId, 'loading', 'awake')
    case SCENE_SCRIPT_AWAKE_TIMEOUT:
      return transition(state, action.payload.sceneId, 'loading', 'awake')
    case SCENE_RENDERER_SENT_START_SIGNAL:
      return transition(state, action.payload.sceneId, 'awake', 'started')
    case SCENE_RUNNING:
      return transition(state, action.payload.sceneId, 'started', 'running')
    case SCENE_RENDERER_FATAL_ERROR:
      return transition(state, action.payload.sceneId, 'running', 'error')
    case SCENE_SCRIPT_SOURCED_FATAL_ERROR:
      const previousState = state.loading[sceneId]
        ? 'loading'
        : state.awake[sceneId]
        ? 'awake'
        : state.started[sceneId]
        ? 'started'
        : state.running[sceneId]
        ? 'running'
        : 'error'
      return transition(state, action.payload.sceneId, previousState, 'error')
    default:
      return state
  }
}
