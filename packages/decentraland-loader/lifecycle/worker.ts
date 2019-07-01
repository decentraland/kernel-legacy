// Entry point for the Lifecycle Worker.
// This doesn't execute on the main thread, so it's a "server" in terms of decentraland-rpc

import { WebWorkerTransport } from 'decentraland-rpc'
import { Adapter } from './lib/adapter'
import { ParcelLifeCycleController } from './controllers/parcel'
import { SceneLifeCycleController } from './controllers/scene'
import { PositionLifecycleController } from './controllers/position'
import { SceneDataDownloadManager } from './controllers/download'
import { ILand } from 'shared/types'
import defaultLogger from 'shared/logger'

export type LifecycleWorkerOptions = {
  contentServer: string
  lineOfSightRadius: number
  mockedDownloadManager?: boolean // For stubbing (builder)
}

const connector = new Adapter(WebWorkerTransport(self as any))

let parcelController: ParcelLifeCycleController
let sceneController: SceneLifeCycleController
let positionController: PositionLifecycleController
let downloadManager: SceneDataDownloadManager

/**
 * Hook all the events to the connector.
 *
 * Make sure the main thread watches for:
 * - 'Position.settled'
 * - 'Position.unsettled'
 * - 'Scene.shouldStart' (sceneId: string)
 * - 'Scene.shouldUnload' (sceneId: string)
 * - 'Scene.shouldPrefetch' (sceneId: string)
 *
 * And optionally (to show loading boxes):
 * - 'Parcel.sighted' (xy: string)
 * - 'Parcel.lostSight' (xy: string)
 *
 * Make sure the main thread reports:
 * - 'User.setPosition' { position: {x: number, y: number } }
 * - 'Scene.prefetchDone' { sceneId: string }
 */
{
  connector.on('Lifecycle.initialize', (options: LifecycleWorkerOptions) => {
    defaultLogger.log('Lifecycle.initialize', options.mockedDownloadManager)
    if (options.mockedDownloadManager) {
      defaultLogger.log('Using an injected "downloadManager"')
      downloadManager = getMockedDownloaderManager(connector)
    } else {
      downloadManager = new SceneDataDownloadManager({ contentServer: options.contentServer })
    }
    parcelController = new ParcelLifeCycleController({ lineOfSightRadius: options.lineOfSightRadius })
    sceneController = new SceneLifeCycleController({ downloadManager })
    positionController = new PositionLifecycleController(sceneController)

    parcelController.on('Sighted', (parcel: string) => sceneController.onSight(parcel))
    parcelController.on('Lost sight', (parcel: string) => sceneController.lostSight(parcel))

    parcelController.on('Sighted', (parcel: string) => connector.notify('Parcel.sighted', { parcel }))
    parcelController.on('Lost sight', (parcel: string) => connector.notify('Parcel.lostSight', { parcel }))

    positionController.on('Settled Position', (sceneId: string) => {
      connector.notify('Position.settled', { sceneId })
    })
    positionController.on('Unsettled Position', () => {
      connector.notify('Position.unsettled')
    })

    sceneController.on('Start scene', sceneId => {
      connector.notify('Scene.shouldStart', { sceneId })
    })
    sceneController.on('Preload scene', sceneId => {
      connector.notify('Scene.shouldPrefetch', { sceneId })
    })
    sceneController.on('Unload scene', sceneId => {
      connector.notify('Scene.shouldUnload', { sceneId })
    })

    connector.on('User.setPosition', (opt: { position: { x: number; y: number } }) => {
      parcelController.reportCurrentPosition(opt.position)
      positionController.reportCurrentPosition(opt.position)
    })

    connector.on('Scene.dataRequest', async (data: { sceneId: string }) =>
      connector.notify('Scene.dataResponse', {
        data: (await downloadManager.getParcelDataBySceneId(data.sceneId)) as ILand
      })
    )

    connector.on('Scene.prefetchDone', (opt: { sceneId: string }) => {
      sceneController.reportDataLoaded(opt.sceneId)
    })
  })
}

function getMockedDownloaderManager(connector: Adapter): SceneDataDownloadManager {
  return {
    getParcelData: position => {
      connector.notify('getParcelData', { position })
      return new Promise(resolve => {
        connector.on('DownloaderManager.getParcelData', ({ scene }: { scene: ILand | null }) => {
          resolve(scene)
        })
      })
    },
    getParcelDataBySceneId: id => {
      connector.notify('getParcelDataBySceneId', { id })
      return new Promise(resolve => {
        connector.on('DownloaderManager.getParcelDataBySceneId', ({ scene }: { scene: ILand | null }) => {
          resolve(scene)
        })
      })
    }
  } as SceneDataDownloadManager
}
