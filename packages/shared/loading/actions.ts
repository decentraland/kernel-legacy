import { action } from 'typesafe-actions'

export const SCENE_LOAD = 'Loading scene'
export const SCENE_START = 'Started scene'
export const SCENE_FAIL = 'Failed scene'

export const signalSceneLoad = (sceneId: string) => action(SCENE_LOAD, sceneId)
export const signalSceneStart = (sceneId: string) => action(SCENE_START, sceneId)
export const signalSceneFail = (sceneId: string) => action(SCENE_FAIL, sceneId)

export function globalSignalSceneLoad(sceneId: string) {
  ;(global as any)['globalStore'].dispatch(signalSceneLoad(sceneId))
}

export function globalSignalSceneStart(sceneId: string) {
  ;(global as any)['globalStore'].dispatch(signalSceneStart(sceneId))
}

export function globalSignalSceneFail(sceneId: string) {
  ;(global as any)['globalStore'].dispatch(signalSceneFail(sceneId))
}
