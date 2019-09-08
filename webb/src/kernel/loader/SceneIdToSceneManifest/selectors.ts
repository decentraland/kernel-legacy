import { RootSceneIdToSceneManifestState, SceneIdToSceneManifestState } from './types'

export function needsResolutionToManifest(state: RootSceneIdToSceneManifestState, sceneId: string): boolean {
  return (
    !state.sceneIdToManifest.scenesById[sceneId] &&
    !state.sceneIdToManifest.loading[sceneId] &&
    !state.sceneIdToManifest.errors[sceneId]
  )
}

export function isMappingResolved(state: RootSceneIdToSceneManifestState, sceneId: string): boolean {
  return !state.sceneIdToManifest.loading[sceneId]
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
