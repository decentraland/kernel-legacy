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
  return state.positionToSceneId.positionToScene[position] !== 'loading'
}

export function internalNeedsResolution(state: PositionToSceneIdState, position: string) {
  return state.positionToScene[position] === undefined
}

export function getDownloadServer(state: RootPositionToSceneIdState) {
  return state.positionToSceneId.downloadServer
}

export function getSceneIdForPositionVector(state: RootPositionToSceneIdState, x: number, y: number) {
  return getSceneIdForPosition(state, encodeParcelPositionFromCoordinates(x, y))
}

export function getSceneCountForPosition(state: RootPositionToSceneIdState, positions: string[]) {
  return positions.reduce((cumm, position) => {
    const sceneId = state.positionToSceneId.positionToScene[position]
    if (sceneId === 'error') {
      return cumm
    }
    if (!sceneId) {
      return cumm
    }
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
  const status = state.positionToSceneId.positionToScene[position]
  if (status === 'loading' || status === 'empty' || status === 'error') {
    return undefined
  }
}

export function getPositionError(state: RootPositionToSceneIdState, position: string) {
  return state.positionToSceneId.positionToScene[position] === 'error'
}

export function getEmptyStatus(state: RootPositionToSceneIdState, position: string) {
  return state.positionToSceneId.positionToScene[position] === 'empty'
}
