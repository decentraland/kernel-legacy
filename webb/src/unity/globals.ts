import { DEBUG, ENGINE_DEBUG_PANEL, SCENE_DEBUG_PANEL } from '@dcl/config'
import { defaultLogger } from '@dcl/utils'
import { sceneManager } from '~/kernel/scene-runner/sagas'
import { store } from '~/kernel/store'
import { isPositionSettled } from '~/kernel/userLocation/PositionSettlement/selectors'
import { UnityRendererParcelSceneAPI } from './UnityRendererParcelSceneAPI'
import { unityInterface } from './outgoing'

export const UnityGlobals = {
  gameInstance: {} as any,
  unityInterface: {} as any,
  browserInterface: {} as any,
  store: store
}

export async function initializeEngine(_gameInstance: any) {
  ;(window as any).gameInstance = UnityGlobals.gameInstance = _gameInstance
  ;(window as any).unityInterface = UnityGlobals.unityInterface = unityInterface
  ;(window as any).store = store

  UnityGlobals.unityInterface.SetPosition(0, 0, 2)
  UnityGlobals.unityInterface.DeactivateRendering()

  if (DEBUG) {
    UnityGlobals.unityInterface.SetDebug()
  }

  if (SCENE_DEBUG_PANEL) {
    UnityGlobals.unityInterface.SetSceneDebugPanel()
  }

  if (ENGINE_DEBUG_PANEL) {
    UnityGlobals.unityInterface.SetEngineDebugPanel()
  }

  /**
   * Register the RendererParcelScene communicator to listen to scene events
   */
  sceneManager.parcelSceneClass = UnityRendererParcelSceneAPI

  let stateKeeper = {
    isSettled: false
  }
  store.subscribe(() => {
    if (!stateKeeper.isSettled && isPositionSettled(store.getState())) {
      stateKeeper.isSettled = true
      UnityGlobals.unityInterface.ActivateRendering()
    }
    if (stateKeeper.isSettled && !isPositionSettled(store.getState())) {
      stateKeeper.isSettled = false
      UnityGlobals.unityInterface.DeactivateRendering()
    }
  })

  return {
    unityInterface: UnityGlobals.unityInterface,
    onMessage(type: string, message: any) {
      if (type in UnityGlobals.browserInterface) {
        // tslint:disable-next-line:semicolon
        ;(UnityGlobals.browserInterface as any)[type](message)
      } else {
        defaultLogger.info(`Unknown message (did you forget to add ${type} to unity-interface/dcl.ts?)`, message)
      }
    }
  }
}
