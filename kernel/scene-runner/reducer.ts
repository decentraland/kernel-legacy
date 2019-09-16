import {
  SCENE_LOADING,
  SCENE_RENDERER_FATAL_ERROR,
  SCENE_RENDERER_SENT_LOADED,
  SCENE_RUNNING,
  SCENE_SCRIPT_AWAKE_TIMEOUT,
  SCENE_SCRIPT_SENT_AWAKE,
  SCENE_SCRIPT_SOURCED_FATAL_ERROR,
  SCENE_SIGHT_DELTA,
  SCENE_STOP
} from './actions'
import { internalGetSceneStatus } from './selectors'
import { SceneLifeCycleAction, SceneLifeCycleState } from './types'

export const INITIAL_SCENE_LIFECYCLE_STATUS: SceneLifeCycleState = {
  sightCount: {},
  loading: {},
  awake: {},
  started: {},
  running: {},
  error: {}
}

type KEY = 'loading' | 'awake' | 'started' | 'running' | 'error'

function transition(state: SceneLifeCycleState, sceneId: string, from: KEY, to: KEY) {
  if (to === undefined) {
    return {
      ...state,
      [from]: { ...state[from], [sceneId]: undefined }
    }
  }
  return {
    ...state,
    [from]: { ...state[from], [sceneId]: undefined },
    [to]: { ...state[to], [sceneId]: true }
  }
}

export function sceneLifeCycleReducer(state?: SceneLifeCycleState, action?: SceneLifeCycleAction): SceneLifeCycleState {
  if (!state) {
    return INITIAL_SCENE_LIFECYCLE_STATUS
  }
  if (!action) {
    return state
  }
  if (action.type === SCENE_SIGHT_DELTA) {
    return { ...state, sightCount: action.payload.updatedSightCount }
  }
  if (action && action.payload && action.payload.sceneId) {
    const sceneId = action.payload.sceneId
    const previousState = internalGetSceneStatus(state, sceneId as string)
    switch (action.type) {
      case SCENE_LOADING:
        return { ...state, loading: { ...state.loading, [action.payload.sceneId]: true } }
      case SCENE_SCRIPT_SENT_AWAKE:
        return transition(state, action.payload.sceneId, 'loading', 'awake')
      case SCENE_SCRIPT_AWAKE_TIMEOUT:
        return transition(state, action.payload.sceneId, 'loading', 'awake')
      case SCENE_RENDERER_SENT_LOADED:
        return transition(state, action.payload.sceneId, 'awake', 'started')
      case SCENE_RUNNING:
        return transition(state, action.payload.sceneId, 'started', 'running')
      case SCENE_STOP:
        return transition(state, action.payload.sceneId, previousState, undefined)
      case SCENE_RENDERER_FATAL_ERROR:
        return transition(state, action.payload.sceneId, previousState, 'error')
      case SCENE_SCRIPT_SOURCED_FATAL_ERROR:
        return transition(state, action.payload.sceneId, previousState, 'error')
      default:
        return state
    }
  }
  return state
}
