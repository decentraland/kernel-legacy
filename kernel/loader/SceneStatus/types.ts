import { action } from 'typesafe-actions'
import { booleanMap } from '../PositionToSceneId/types'

export type SceneLifeCyleState = {
  loading: booleanMap
  awake: booleanMap
  started: booleanMap
  running: booleanMap
  error: booleanMap
}

export const SCENE_START = 'Scene start'
export const SCENE_SCRIPT_SENT_AWAKE = 'Script finished sending the initial messages'
export const SCENE_SCRIPT_AWAKE_TIMEOUT = 'Script took more than 5 seconds to send initial batch'
export const SCENE_RENDERER_SENT_START_SIGNAL = 'Renderer finished processing initial messages'
export const SCENE_RUNNING = 'Scene is running: rendereable and walkable'
export const SCENE_SCRIPT_SOURCED_FATAL_ERROR = 'Script failure on scene'
export const SCENE_RENDERER_FATAL_ERROR = 'Renderer error'
export const SCENE_STOP = 'Scene unloaded and disposed'

export const startScene = (sceneId: string) => action(SCENE_START, { sceneId })
export const scriptSentAwake = (sceneId: string) => action(SCENE_SCRIPT_SENT_AWAKE, { sceneId })
export const scriptTimedout = (sceneId: string) => action(SCENE_SCRIPT_AWAKE_TIMEOUT, { sceneId })
export const scriptSentLoaded = (sceneId: string) => action(SCENE_RENDERER_SENT_START_SIGNAL, { sceneId })
export const sceneRunning = (sceneId: string) => action(SCENE_RUNNING, { sceneId })
export const sceneScriptError = (sceneId: string) => action(SCENE_SCRIPT_SOURCED_FATAL_ERROR, { sceneId })
export const sceneRendererError = (sceneId: string) => action(SCENE_RENDERER_FATAL_ERROR, { sceneId })
export const stopScene = (sceneId: string) => action(SCENE_STOP, { sceneId })

export type StartScene = ReturnType<typeof startScene>
export type ScriptSentAwake = ReturnType<typeof scriptSentAwake>
export type ScriptTimedout = ReturnType<typeof scriptTimedout>
export type ScriptSentLoaded = ReturnType<typeof scriptSentLoaded>
export type SceneRunning = ReturnType<typeof sceneRunning>
export type SceneScriptError = ReturnType<typeof sceneScriptError>
export type SceneRendererError = ReturnType<typeof sceneRendererError>
export type StopScene = ReturnType<typeof stopScene>

export type SceneLifeCycleAction =
  | StartScene
  | ScriptSentAwake
  | ScriptTimedout
  | ScriptSentLoaded
  | SceneRunning
  | SceneScriptError
  | SceneRendererError
  | StopScene
