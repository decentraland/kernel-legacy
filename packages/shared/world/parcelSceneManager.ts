import { Vector2 } from 'decentraland-ecs/src/decentraland/math'
import { initParcelSceneWorker } from 'decentraland-loader/lifecycle/manager'
import { worldToGrid } from 'atomicHelpers/parcelScenePositions'
import { ETHEREUM_NETWORK } from 'config'

import { positionObservable, teleportObservable } from './positionThings'
import { SceneWorker, ParcelSceneAPI } from './SceneWorker'
import { LoadableParcelScene, EnvironmentData, ILand, ILandToLoadableParcelScene } from '../types'
import { ScriptingTransport } from 'decentraland-rpc/lib/common/json-rpc/types'

export type EnableParcelSceneLoadingOptions = {
  parcelSceneClass: { new (x: EnvironmentData<LoadableParcelScene>): ParcelSceneAPI }
  shouldLoadParcelScene: (parcelToLoad: ILand) => boolean
  onSpawnpoint?: (initialLand: ILand) => void
  onLoadParcelScenes?(x: ILand[]): void
}

export const loadedParcelSceneWorkers = new Map<string, SceneWorker>()
export const loadedSceneWorkers = new Set<SceneWorker>()

/**
 * Retrieve the Scene based on it's ID, usually RootCID
 */
export function getSceneWorkerBySceneID(sceneId: string) {
  return loadedParcelSceneWorkers.get(sceneId)
}

/**
 * Returns the id of the scene, usually the RootCID
 */
export function getParcelSceneID(parcelScene: ParcelSceneAPI) {
  return parcelScene.data.id
}

export function getBaseCoordinates(worker: SceneWorker) {
  return (
    worker &&
    worker.parcelScene &&
    worker.parcelScene.data &&
    worker.parcelScene.data.data &&
    worker.parcelScene.data.data.scene &&
    worker.parcelScene.data.data.scene.base
  )
}

export function stopParcelSceneWorker(worker: SceneWorker) {
  if (worker && !worker.persistent) {
    forceStopParcelSceneWorker(worker)
  }
}

export function forceStopParcelSceneWorker(worker: SceneWorker) {
  worker.dispose()
}

export function loadParcelScene(parcelScene: ParcelSceneAPI, transport?: ScriptingTransport) {
  const rootCID = getParcelSceneID(parcelScene)
  let parcelSceneWorker = loadedParcelSceneWorkers.get(rootCID)

  if (!parcelSceneWorker) {
    parcelSceneWorker = new SceneWorker(parcelScene, transport)

    loadedParcelSceneWorkers.set(rootCID, parcelSceneWorker)
    loadedSceneWorkers.add(parcelSceneWorker)

    parcelSceneWorker.onDisposeObservable.addOnce(() => {
      loadedParcelSceneWorkers.delete(rootCID)
    })
  }

  return parcelSceneWorker
}

export async function enableParcelSceneLoading(network: ETHEREUM_NETWORK, options: EnableParcelSceneLoadingOptions) {
  const ret = await initParcelSceneWorker(network)
  const position = Vector2.Zero()

  ret.on('Scene.shouldPrefetch', async (opts: { sceneCID: string }) => {
    const parcelSceneToLoad = await ret.getParcelData(opts.sceneCID)
    if (!options.shouldLoadParcelScene(parcelSceneToLoad)) {
      return
    }
    if (!getSceneWorkerBySceneID(opts.sceneCID)) {
      const parcelScene = new options.parcelSceneClass(ILandToLoadableParcelScene(parcelSceneToLoad))
      loadParcelScene(parcelScene)
    }
    ret.notify('Scene.prefetchDone', opts)
  })

  ret.on('Scene.shouldStart', async (opts: { sceneCID: string }) => {
    if (options.onLoadParcelScenes) {
      options.onLoadParcelScenes([await ret.getParcelData(opts.sceneCID)])
    }
  })

  ret.on('Scene.shouldUnload', async (opts: { sceneCID: string }) => {
    const worker = loadedParcelSceneWorkers.get(opts.sceneCID)
    if (!worker) {
      return
    }
    stopParcelSceneWorker(worker)
  })

  ret.on('Position.settled', async (sceneCID: string) => {
    options.onSpawnpoint && options.onSpawnpoint(await ret.getParcelData(sceneCID))
  })

  teleportObservable.add((position: { x: number; y: number }) => {
    ret.notify('User.setPosition', { position })
  })

  positionObservable.add(obj => {
    worldToGrid(obj.position, position)
    ret.notify('User.setPosition', { position })
  })
}
