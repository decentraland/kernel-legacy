import { encodeParcelPositionFromCoordinates } from '@dcl/utils'
import { PositionToSceneIdState, RootPositionToSceneIdState } from './types'

export function multipleNeedsResolution(
  state: RootPositionToSceneIdState,
  positions: string[]
): { [key: string]: boolean } {
  return positions.reduce((cumm, position) => {
    cumm[position] = internalNeedsResolution(state.positionToSceneId, position)
    return cumm
  }, {})
}

export function needsResolution(state: RootPositionToSceneIdState, position: string) {
  return internalNeedsResolution(state.positionToSceneId, position)
}

export function hasFinishedLoadingPositionMapping(state: RootPositionToSceneIdState, position: string) {
  return !state.positionToSceneId.loadingPositionCoordinates[position]
}

export function internalNeedsResolution(state: PositionToSceneIdState, position: string) {
  return (
    !state.resolvedPositionToScene[position] &&
    !state.errorPositions[position] &&
    !state.emptyPositions[position] &&
    !state.loadingPositionCoordinates[position]
  )
}

export function getDownloadServer(state: RootPositionToSceneIdState) {
  return state.positionToSceneId.downloadServer
}

export function getSceneIdForPositionVector(state: RootPositionToSceneIdState, x: number, y: number) {
  return getSceneIdForPosition(state, encodeParcelPositionFromCoordinates(x, y))
}

export function getSceneCountForPosition(state: RootPositionToSceneIdState, positions: string[]) {
  return positions.reduce((cumm, position) => {
    const sceneId = state.positionToSceneId.resolvedPositionToScene[position]
    if (cumm[sceneId] === undefined) {
      cumm[sceneId] = 1
    } else {
      cumm[sceneId]++
    }
    return cumm
  }, {})
}

export function getSceneIdForPositions(state: RootPositionToSceneIdState, positions: string[]) {
  return Object.keys(getSceneCountForPosition(state, positions))
}

export function getSceneIdForPosition(state: RootPositionToSceneIdState, position: string) {
  return state.positionToSceneId.resolvedPositionToScene[position]
}

export function getPositionError(state: RootPositionToSceneIdState, position: string) {
  return state.positionToSceneId.errorPositions[position]
}

export function getEmptyStatus(state: RootPositionToSceneIdState, position: string) {
  return state.positionToSceneId.emptyPositions[position]
}
