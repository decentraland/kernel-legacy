import {
  SceneLifeCycleAction,
  SceneLifeCyleState,
  SCENE_LOADING,
  SCENE_RENDERER_FATAL_ERROR,
  SCENE_RENDERER_SENT_START_SIGNAL,
  SCENE_RUNNING,
  SCENE_SCRIPT_AWAKE_TIMEOUT,
  SCENE_SCRIPT_SENT_AWAKE,
  SCENE_SCRIPT_SOURCED_FATAL_ERROR,
  SCENE_STOP
} from './types'
import { getSceneStatus } from './selectors'

export const INITIAL_SCENE_LIFECYCLE_STATUS: SceneLifeCyleState = {
  loading: {},
  awake: {},
  started: {},
  running: {},
  error: {}
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
  const previousState = getSceneStatus(state, sceneId)
  switch (action.type) {
    case SCENE_LOADING:
      return { ...state, loading: { ...state.loading, [action.payload.sceneId]: true } }
    case SCENE_SCRIPT_SENT_AWAKE:
      return transition(state, action.payload.sceneId, 'loading', 'awake')
    case SCENE_SCRIPT_AWAKE_TIMEOUT:
      return transition(state, action.payload.sceneId, 'loading', 'awake')
    case SCENE_RENDERER_SENT_START_SIGNAL:
      return transition(state, action.payload.sceneId, 'awake', 'started')
    case SCENE_RUNNING:
      return transition(state, action.payload.sceneId, 'started', 'running')
    case SCENE_STOP:
      return transition(state, action.payload.sceneId, previousState, 'running')
    case SCENE_RENDERER_FATAL_ERROR:
      return transition(state, action.payload.sceneId, previousState, 'error')
    case SCENE_SCRIPT_SOURCED_FATAL_ERROR:
      return transition(state, action.payload.sceneId, previousState, 'error')
    default:
      return state
  }
}
