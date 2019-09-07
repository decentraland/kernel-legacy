import { RootSceneLifeCyleState, SceneLifeCyleState } from './types'
import { getKeysMappingToTrue } from '@dcl/utils'

export const getLoadingScenes = (state: RootSceneLifeCyleState) => getKeysMappingToTrue(state.sceneLifeCycle.loading)
export const getAwakeScenes = (state: RootSceneLifeCyleState) => getKeysMappingToTrue(state.sceneLifeCycle.awake)
export const getStartingScenes = (state: RootSceneLifeCyleState) => getKeysMappingToTrue(state.sceneLifeCycle.started)
export const getRunningScenes = (state: RootSceneLifeCyleState) => getKeysMappingToTrue(state.sceneLifeCycle.running)

export function getSceneStatus(state: SceneLifeCyleState, sceneId: string) {
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
