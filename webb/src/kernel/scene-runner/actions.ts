import { action } from 'typesafe-actions'

export const SCENE_LOADING = 'Scene started loading'
export const SCENE_SCRIPT_SENT_AWAKE = 'Script finished sending the initial messages'
export const SCENE_SCRIPT_AWAKE_TIMEOUT = 'Script took more than 5 seconds to send initial batch'
export const SCENE_RENDERER_SENT_LOADED = 'Renderer finished processing initial messages'
export const SCENE_RUNNING = 'Scene is running: rendereable and walkable'
export const SCENE_SCRIPT_SOURCED_FATAL_ERROR = 'Script failure on scene'
export const SCENE_RENDERER_FATAL_ERROR = 'Renderer error'
export const SCENE_STOP = 'Scene unloaded and disposed'

export const sceneLoading = (sceneId: string) => action(SCENE_LOADING, { sceneId })
export const scriptSentAwake = (sceneId: string) => action(SCENE_SCRIPT_SENT_AWAKE, { sceneId })
export const scriptTimedout = (sceneId: string) => action(SCENE_SCRIPT_AWAKE_TIMEOUT, { sceneId })
export const rendererSentLoaded = (sceneId: string) => action(SCENE_RENDERER_SENT_LOADED, { sceneId })
export const sceneRunning = (sceneId: string) => action(SCENE_RUNNING, { sceneId })
export const sceneScriptError = (sceneId: string) => action(SCENE_SCRIPT_SOURCED_FATAL_ERROR, { sceneId })
export const sceneRendererError = (sceneId: string) => action(SCENE_RENDERER_FATAL_ERROR, { sceneId })
export const stopScene = (sceneId: string) => action(SCENE_STOP, { sceneId })

export const SCENE_SIGHT_DELTA = 'Parcels of a scene: partial sight changed'
export const reportSceneSightDelta = (payload: {
  updatedSightCount: { [sceneId: string]: number }
  newlySeenScenes: string[]
  lostSightScenes: string[]
}) => action(SCENE_SIGHT_DELTA, payload)
