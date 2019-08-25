import { EventSubscriber, inject, Script } from '@dcl/rpc/client'
import { DecentralandInterface, DevTools, IECSEngine } from '@dcl/scene-api'
import { generateDCLInterface } from '../generateDCLInterface'
import { customEval, getES5Context } from './sandbox'
import { EntityAction, defaultLogger } from '@dcl/utils'
import { resolveMapping } from './resolveMapping'
import { getEthereumProvider } from '../../exposedApis/ethereumProvider'
import { UPDATE_INTERVAL } from './constants'

export default class GamekitScene extends Script {
  @inject('EngineAPI')
  engine: IECSEngine | null = null

  @inject('DevTools')
  devTools: any

  eventSubscriber!: EventSubscriber
  onStartFunctions: Array<Function> = []
  onUpdateFunctions: Array<(dt: number) => void> = []
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
  async getEthereumProvider() {
    return getEthereumProvider(this.loadAPIs.bind(this))
  }
  async loadProject() {
    const { EnvironmentAPI } = (await this.loadAPIs(['EnvironmentAPI'])) as any
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
      const dcl: DecentralandInterface = generateDCLInterface(this)
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
          const engine: IECSEngine = this.engine as any
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
        ;((this.engine as any) as IECSEngine).sendBatch(batch).catch((e: Error) => this.onError(e))
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
