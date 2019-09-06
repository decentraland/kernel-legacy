import { RootSceneIdToSceneManifestState, SceneIdToSceneManifestState } from './types'
import { booleanMap } from '@dcl/utils'

export function needsResolutionToManifest(state: RootSceneIdToSceneManifestState, positions: string[]): booleanMap {
  return positions.reduce((cumm, position) => {
    cumm[position] = internalNeedsResolution(state.sceneIdToManifest, position)
    return cumm
  }, {})
}

export function internalNeedsResolution(state: SceneIdToSceneManifestState, position: string) {
  return !state.scenesById[position] && !state.loading[position] && !state.errors[position]
}

export function getDownloadServer(state: RootSceneIdToSceneManifestState) {
  return state.sceneIdToManifest.downloadServer
}

export function getSceneManifest(state: RootSceneIdToSceneManifestState, sceneId: string) {
  return state.sceneIdToManifest.scenesById[sceneId]
}

export function getSceneError(state: RootSceneIdToSceneManifestState, sceneId: string) {
  return state.sceneIdToManifest.errors[sceneId]
}
