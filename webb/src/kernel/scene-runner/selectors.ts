import { getKeysMappingToTrue } from '@dcl/utils'
import { getSceneCountForPosition, getSceneIdForPosition } from '../loader/PositionToSceneId/selectors'
import { RootPositionToSceneIdState } from '../loader/PositionToSceneId/types'
import { allInSight } from '../userLocation/ParcelSight/selectors'
import { RootParcelSightState } from '../userLocation/ParcelSight/types'
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

export function getSightedScenesRunningReport(
  state: RootSceneLifeCycleState & RootParcelSightState & RootPositionToSceneIdState
) {
  const currentlySeenParcels = allInSight(state)
  const runningStatus = getSceneCountForPosition(state, currentlySeenParcels)
  const currentlySeenScenes = Object.keys(runningStatus)
  for (let scene of currentlySeenScenes) {
    runningStatus[scene] = internalGetSceneStatus(state.sceneLifeCycle, scene)
  }
  return runningStatus
}

export function getSceneDeltaPositionReport(
  state: RootSceneLifeCycleState & RootParcelSightState & RootPositionToSceneIdState
) {
  const currentlySeenParcels = allInSight(state)
  const updatedSightCount = getSceneCountForPosition(state, currentlySeenParcels)
  const oldSceneSightCount = state.sceneLifeCycle.sightCount
  const oldScenes = Object.keys(oldSceneSightCount).filter(_ => !!_ && _ !== 'error' && !!oldSceneSightCount[_])
  const newScenes = Object.keys(updatedSightCount).filter(_ => !!_ && _ !== 'error' && !!updatedSightCount[_])

  const seenBefore = {}
  const lostSightScenes = []
  for (let sceneId of oldScenes) {
    seenBefore[sceneId] = true
    if (!updatedSightCount[sceneId]) {
      lostSightScenes.push(sceneId)
      updatedSightCount[sceneId] = undefined
    }
  }
  const newlySeenScenes = []
  for (let sceneId of newScenes) {
    if (!seenBefore[sceneId]) {
      newlySeenScenes.push(sceneId)
    }
  }

  return { updatedSightCount, newlySeenScenes, lostSightScenes }
}

export function shouldTriggerLoading(state: RootSceneLifeCycleState, sceneId: string) {
  return !internalGetSceneStatus(state.sceneLifeCycle, sceneId)
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
          : state.error[sceneId]
            ? 'error'
            : undefined
}

export function isSceneAtPositionRendereable(
  state: RootSceneLifeCycleState & RootPositionToSceneIdState,
  position: string
) {
  const sceneId = state.positionToSceneId.positionToScene[position]
  const status = internalGetSceneStatus(state.sceneLifeCycle, sceneId)
  return status === 'running' || status === 'error'
}

export function getSceneStatusByPosition(
  state: RootSceneLifeCycleState & RootPositionToSceneIdState,
  position: string
) {
  if (!getSceneIdForPosition(state, position)) {
    return null
  }
  return internalGetSceneStatus(state.sceneLifeCycle, state.positionToSceneId.positionToScene[position])
}

export const getSceneLifeCycle = (state: RootSceneLifeCycleState) => state.sceneLifeCycle
