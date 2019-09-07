import { booleanMap } from '@dcl/utils'

export type coordinateString = string
export type sceneIdString = string

export type PositionToSceneIdState = {
  downloadServer: string
  loadingPositionCoordinates: booleanMap
  resolvedPositionToScene: Record<coordinateString, sceneIdString>
  sceneIdToPositions: Record<sceneIdString, coordinateString[]>
  errorPositions: Record<string, boolean>
  emptyPositions: Record<string, boolean>
}

export type RootPositionToSceneIdState = {
  positionToSceneId: PositionToSceneIdState
}
