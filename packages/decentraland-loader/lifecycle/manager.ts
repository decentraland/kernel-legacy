// This gets executed from the main thread and serves as an interface
// to communicate with the Lifecycle worker, so it's a "Server" in terms of decentraland-rpc
import future, { IFuture } from 'fp-future'
import { TransportBasedServer } from 'decentraland-rpc/lib/host/TransportBasedServer'
import { WebWorkerTransport } from 'decentraland-rpc/lib/common/transports/WebWorker'

import { resolveUrl } from 'atomicHelpers/parseUrl'
import { ILand } from 'shared/types'
import defaultLogger from 'shared/logger'
import { SceneDataDownloadManager } from './controllers/download'
import { DEBUG, parcelLimits, getServerConfigurations, ENABLE_EMPTY_SCENES } from '../../config'

/*
 * The worker is set up on the first require of this file
 */
const lifecycleWorkerRaw = require('raw-loader!../../../static/loader/lifecycle/worker.js')
const lifecycleWorkerUrl = URL.createObjectURL(new Blob([lifecycleWorkerRaw]))
const worker: Worker = new (Worker as any)(lifecycleWorkerUrl, { name: 'LifecycleWorker' })
worker.onerror = e => defaultLogger.error('Loader worker error', e)

export class LifecycleManager extends TransportBasedServer {
  sceneIdToRequest: Map<string, IFuture<ILand>> = new Map()
  enable() {
    super.enable()
    this.on('Scene.dataResponse', (scene: { data: ILand }) => {
      if (scene.data) {
        const future = this.sceneIdToRequest.get(scene.data.sceneId)

        if (future) {
          future.resolve(scene.data)
        }
      }
    })
  }

  getParcelData(sceneId: string) {
    let theFuture = this.sceneIdToRequest.get(sceneId)
    if (!theFuture) {
      theFuture = future<ILand>()
      this.sceneIdToRequest.set(sceneId, theFuture)
      this.notify('Scene.dataRequest', { sceneId })
    }
    return theFuture
  }
}

let server: LifecycleManager

export const getServer = () => server

export async function initParcelSceneWorker(downloadManager?: SceneDataDownloadManager) {
  server = new LifecycleManager(WebWorkerTransport(worker))

  server.enable()

  server.notify('Lifecycle.initialize', {
    contentServer: DEBUG ? resolveUrl(document.location.origin, '/local-ipfs') : getServerConfigurations().content,
    lineOfSightRadius: parcelLimits.visibleRadius,
    mockedDownloadManager: !!downloadManager,
    secureRadius: parcelLimits.secureRadius,
    emptyScenes: ENABLE_EMPTY_SCENES && !(globalThis as any)['isRunningTests']
  })

  if (downloadManager) {
    defaultLogger.log('Using an injected "downloadManager"', downloadManager)
    setupMockedDownloaderManager(server, downloadManager)
  }

  return server
}

function setupMockedDownloaderManager(server: LifecycleManager, downloadManager: SceneDataDownloadManager) {
  server.on('getParcelData', async ({ position }) => {
    const scene = await downloadManager.getParcelData(position)
    server.notify('DownloaderManager.getParcelData', { scene })
  })

  server.on('getParcelDataBySceneId', async ({ id }) => {
    const scene = await downloadManager.getParcelDataBySceneId(id)
    server.notify('DownloaderManager.getParcelDataBySceneId', { scene })
  })
}
