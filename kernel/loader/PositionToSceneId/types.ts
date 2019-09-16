export type coordinateString = string
export type sceneIdString = string

export type PositionToSceneIdState = {
  downloadServer: string
  sceneIdToPositions: Record<sceneIdString, coordinateString[]>
  positionToScene: Record<coordinateString, sceneIdString>
}

export type RootPositionToSceneIdState = {
  positionToSceneId: PositionToSceneIdState
}
