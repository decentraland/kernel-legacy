import { EventSubscriber, inject, Script } from '@dcl/rpc-client'
import { IEngineAPI, DecentralandInterface, DevTools } from '@dcl/scene-api'
import { generateInterface } from './generateDcl'
import { customEval, getES5Context } from './sandbox'
import { EntityAction, defaultLogger, RPCSendableMessage } from '@dcl/utils'

const FPS = 30
const UPDATE_INTERVAL = 1000 / FPS
const dataUrlRE = /^data:[^/]+\/[^;]+;base64,/
const blobRE = /^blob:http/

function resolveMapping(mapping: string | undefined, mappingName: string, baseUrl: string) {
  let url = mappingName

  if (mapping) {
    url = mapping
  }

  if (dataUrlRE.test(url)) {
    return url
  }

  if (blobRE.test(url)) {
    return url
  }

  return (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/') + url
}

export default class GamekitScene extends Script {
  @inject('EngineAPI')
  engine: IEngineAPI | null = null

  @inject('DevTools')
  devTools: any

  eventSubscriber!: EventSubscriber

  onUpdateFunctions: Array<(dt: number) => void> = []
  onStartFunctions: Array<Function> = []
  onEventFunctions: Array<(event: any) => void> = []
  events: EntityAction[] = []

  updateInterval = UPDATE_INTERVAL
  devToolsAdapter: DevTools | null = null

  manualUpdate: boolean = false

  didStart = false
  provider: any = null

  onError(error: Error) {
    if (this.devToolsAdapter) {
      this.devToolsAdapter.logger.error(error.toString())
    } else {
      defaultLogger.error('', error)
    }
  }

  onLog(...messages: any[]) {
    if (this.devToolsAdapter) {
      this.devToolsAdapter.logger.error(JSON.stringify([...messages]))
    } else {
      defaultLogger.info('', ...messages)
    }
  }

  /**
   * Get a standard ethereum provider
   * Please notice this is highly experimental and might change in the future.
   *
   * method whitelist = [
   *   'eth_sendTransaction',
   *   'eth_getTransactionReceipt',
   *   'eth_estimateGas',
   *   'eth_call',
   *   'eth_getBalance',
   *   'eth_getStorageAt',
   *   'eth_blockNumber',
   *   'eth_getBlockByNumber',
   *   'eth_gasPrice',
   *   'eth_protocolVersion',
   *   'net_version',
   *   'web3_sha3',
   *   'web3_clientVersion',
   *   'eth_getTransactionCount'
   * ]
   */
  async getEthereumProvider() {
    const { EthereumController } = await this.loadAPIs(['EthereumController'])

    return {
      // @internal
      send(message: RPCSendableMessage, callback?: (error: Error | null, result?: any) => void): void {
        if (message && callback && callback instanceof Function) {
          EthereumController.sendAsync(message)
            .then((x: any) => callback(null, x))
            .catch(callback)
        } else {
          throw new Error('Decentraland provider only allows async calls')
        }
      },
      sendAsync(message: RPCSendableMessage, callback: (error: Error | null, result?: any) => void): void {
        EthereumController.sendAsync(message)
          .then((x: any) => callback(null, x))
          .catch(callback)
      }
    } as {
      send: Function
      sendAsync: Function
    }
  }

  async loadProject() {
    const { EnvironmentAPI } = (await this.loadAPIs(['EnvironmentAPI'])) as { EnvironmentAPI: EnvironmentAPI }
    const bootstrapData = await EnvironmentAPI.getBootstrapData()

    if (bootstrapData && bootstrapData.main) {
      const mappingName = bootstrapData.main
      const mapping = bootstrapData.mappings.find($ => $.file === mappingName)
      const url = resolveMapping(mapping && mapping.hash, mappingName, bootstrapData.baseUrl)
      const html = await fetch(url)

      if (html.ok) {
        return html.text()
      } else {
        throw new Error(`SDK: Error while loading ${url} (${mappingName} -> ${mapping})`)
      }
    }
  }

  fireEvent(event: any) {
    try {
      for (let trigger of this.onEventFunctions) {
        trigger(event)
      }
    } catch (e) {
      this.onError(e)
    }
  }

  async systemDidEnable() {
    this.eventSubscriber = new EventSubscriber(this.engine as any)
    this.devToolsAdapter = new DevTools(this.devTools)

    try {
      const source = await this.loadProject()

      if (!source) {
        throw new Error('Received empty source.')
      }

      const dcl: DecentralandInterface = generateInterface(this)

      {
        const monkeyPatchDcl: any = dcl
        monkeyPatchDcl.updateEntity = function() {
          throw new Error('The scene is using an outdated version of decentraland-ecs, please upgrade to >5.0.0')
        }
      }

      try {
        await customEval((source as any) as string, getES5Context({ dcl }))

        this.events.push({
          type: 'SceneStarted',
          tag: 'scene',
          payload: '{}'
        })

        if (!this.manualUpdate) {
          this.startLoop()
        }

        this.onStartFunctions.push(() => {
          const engine: IEngineAPI = this.engine as any
          engine.startSignal().catch((e: Error) => this.onError(e))
        })
      } catch (e) {
        this.onError(e)
      }

      this.sendBatch()

      setTimeout(() => {
        this.onStartFunctions.forEach($ => {
          try {
            $()
          } catch (e) {
            this.onError(e)
          }
        })
        // TODO: review this timeout
      }, 5000)
    } catch (e) {
      this.onError(e)
      // unload should be triggered here
    } finally {
      this.didStart = true
    }
  }

  update(time: number) {
    for (let trigger of this.onUpdateFunctions) {
      try {
        trigger(time)
      } catch (e) {
        this.onError(e)
      }
    }

    this.sendBatch()
  }

  private sendBatch() {
    try {
      if (this.events.length) {
        const batch = this.events.slice()
        this.events.length = 0
        ;((this.engine as any) as IEngineAPI).sendBatch(batch).catch((e: Error) => this.onError(e))
      }
    } catch (e) {
      this.onError(e)
    }
  }

  private startLoop() {
    let start = performance.now()

    const update = () => {
      const now = performance.now()
      const dt = now - start
      start = now

      setTimeout(update, this.updateInterval)

      let time = dt / 1000

      this.update(time)
    }

    update()
  }
}
