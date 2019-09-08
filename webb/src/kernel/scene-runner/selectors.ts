import { getKeysMappingToTrue } from '@dcl/utils'
import { RootPositionToSceneIdState } from '../loader/PositionToSceneId/types'
import { RootSceneLifeCycleState, SceneLifeCycleState } from './types'

export const getLoadingScenes = (state: RootSceneLifeCycleState) => getKeysMappingToTrue(state.sceneLifeCycle.loading)
export const getAwakeScenes = (state: RootSceneLifeCycleState) => getKeysMappingToTrue(state.sceneLifeCycle.awake)
export const getStartingScenes = (state: RootSceneLifeCycleState) => getKeysMappingToTrue(state.sceneLifeCycle.started)
export const getRunningScenes = (state: RootSceneLifeCycleState) => getKeysMappingToTrue(state.sceneLifeCycle.running)

export function getSceneStatus(state: RootSceneLifeCycleState, sceneId: string) {
  return internalGetSceneStatus(state.sceneLifeCycle, sceneId)
}

export function shouldStartLoadScene(state: RootSceneLifeCycleState, sceneId: string) {
  const status = internalGetSceneStatus(state.sceneLifeCycle, sceneId)
  if (status === 'loading' || status === 'awake' || status === 'started') {
    return false
  }
  return true
}

export function shouldTriggerLoading(state: RootSceneLifeCycleState, sceneId: string) {
  return internalGetSceneStatus(state.sceneLifeCycle, sceneId) === undefined
}

export function internalGetSceneStatus(state: SceneLifeCycleState, sceneId: string) {
  return state.loading[sceneId]
    ? 'loading'
    : state.awake[sceneId]
    ? 'awake'
    : state.started[sceneId]
    ? 'started'
    : state.running[sceneId]
    ? 'running'
    : 'error'
}

export function getSceneStatusByPosition(
  state: RootSceneLifeCycleState & RootPositionToSceneIdState,
  position: string
) {
  if (!state.positionToSceneId.resolvedPositionToScene[position]) {
    return null
  }
  return internalGetSceneStatus(state.sceneLifeCycle, state.positionToSceneId.resolvedPositionToScene[position])
}

export const getSceneLifeCycle = (state: RootSceneLifeCycleState) => state.sceneLifeCycle
