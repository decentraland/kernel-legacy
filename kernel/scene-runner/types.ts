import { booleanMap } from '@dcl/utils'
import {
  sceneLoading,
  scriptSentAwake,
  scriptTimedout,
  rendererSentLoaded,
  sceneRunning,
  sceneScriptError,
  sceneRendererError,
  stopScene,
  reportSceneSightDelta
} from './actions'

export type SceneLifeCycleState = {
  sightCount: { [sceneId: string]: number }
  loading: booleanMap
  awake: booleanMap
  started: booleanMap
  running: booleanMap
  error: booleanMap
}

export type RootSceneLifeCycleState = {
  sceneLifeCycle: SceneLifeCycleState
}

export type SceneLoading = ReturnType<typeof sceneLoading>
export type ScriptSentAwake = ReturnType<typeof scriptSentAwake>
export type ScriptTimedout = ReturnType<typeof scriptTimedout>
export type RendererSentLoaded = ReturnType<typeof rendererSentLoaded>
export type SceneRunning = ReturnType<typeof sceneRunning>
export type SceneScriptError = ReturnType<typeof sceneScriptError>
export type SceneRendererError = ReturnType<typeof sceneRendererError>
export type StopScene = ReturnType<typeof stopScene>
export type SceneSightDeltaAction = ReturnType<typeof reportSceneSightDelta>

export type SceneLifeCycleAction =
  | SceneLoading
  | ScriptSentAwake
  | ScriptTimedout
  | RendererSentLoaded
  | SceneRunning
  | SceneScriptError
  | SceneRendererError
  | StopScene
  | SceneSightDeltaAction
