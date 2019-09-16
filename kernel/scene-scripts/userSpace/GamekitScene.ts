import { ILogOpts, ScriptingTransport } from '@dcl/rpc'
import { inject, Script } from '@dcl/rpc/client'
import { DecentralandInterface, DevTools } from '@dcl/scene-api'
import { defaultLogger, EntityAction } from '@dcl/utils'

import { BuildDCLInterface } from './DCLInterface/BuildDCLInterface'
import { BuildECSInterface } from './DCLInterface/BuildECSInterface'
import { loadGamekitEntrypoint } from './loadGamekitEntrypoint'
import { customEval, getES5Context } from './sandbox'
import { IRendererParcelSceneToScript } from '../kernelSpace/IRendererParcelSceneToScript'
import { ISceneRunningScript } from '../interface/ISceneRunningScript'

const LOADING = 'loading'
const AWAKE = 'awake'
const RUNNING = 'running'

/**
 * Scripts contain custom logic that is executed outside of the context of the ScriptingHost. They can run either
 * locally using the Webworker transport, or in another server through HTTP Requests/Web Sockets.
 *
 * This is the class that runs all the magic (see `runFirstRound`)
 */
export class GamekitScene extends Script implements ISceneRunningScript {
  @inject('EngineAPI')
  engine: IRendererParcelSceneToScript

  @inject('DevTools')
  devTools: any
  devToolsAdapter?: DevTools

  outboundEventQueue: EntityAction[] = []
  status: typeof LOADING | typeof AWAKE | typeof RUNNING = LOADING

  dcl: DecentralandInterface

  constructor(transport: ScriptingTransport, opt?: ILogOpts) {
    super(transport, opt)
  }

  async systemDidEnable() {
    this.setupDCLInterface()
    this.setupDevtools()
    this.sendBatch()

    this.status = AWAKE

    try {
      await this.runFirstRound()
      this.runStartFunctions()
    } catch (error) {
      throw error
    }

    this.status = RUNNING
  }

  protected setupDCLInterface() {
    this.dcl = { ...BuildDCLInterface(this), ...BuildECSInterface(this.outboundEventQueue) }
    this.fixupDeprecations()
  }

  protected sendBatch() {
    try {
      const batch = this.outboundEventQueue.slice()
      this.outboundEventQueue.length = 0
      this.engine.sendBatch(batch).catch((e: Error) => this.onError(e))
    } catch (e) {
      this.onError(e)
    }
  }

  async runFirstRound() {
    let source: string
    try {
      source = await this.downloadEntrypoint()
    } catch (e) {
      throw new Error(e)
    }

    try {
      await customEval(source, getES5Context({ dcl: this.dcl }))
    } catch (e) {
      throw new Error(e)
    }

    this.setupSceneStartSignalResponse()
  }

  protected setupSceneStartSignalResponse() {
    const handler = (name: string) => {
      if (name !== 'sceneStart') {
        return
      }
      if (!this.managedUpdateCalls) {
        this.startLoop()
      }
      this.runStartFunctions()

      // Only run this handler once
      this.onEventFunctions.splice(this.onEventFunctions.indexOf(handler), 1)
    }
    this.onEventFunctions.push(handler)

    this.enqueueInitMessagesFinished()

    this.onStartFunctions.push(() => {
      this.engine.startSignal().catch((e: Error) => this.onError(e))
    })
  }

  protected runStartFunctions() {
    for (let startFunction of this.onStartFunctions) {
      try {
        startFunction()
      } catch (e) {
        this.onError(e)
      }
    }
  }

  protected update(dt: number) {
    for (let updateFunction of this.onUpdateFunctions) {
      try {
        updateFunction(dt)
      } catch (e) {
        this.onError(e)
      }
    }
    this.sendBatch()
  }

  currentTimeout: number = undefined
  targetFramesPerSecond = 30
  updateInterval = 1000 / this.targetFramesPerSecond

  startLoop() {
    const that = this
    let start = this.now()
    function update() {
      const now = that.now()
      const dt = now - start
      start = now
      that.currentTimeout = setTimeout(update, that.updateInterval) as any
      that.update(dt)
    }
    update()
  }

  now() {
    return new Date().getTime() / 1000
  }

  pauseLoop() {
    if (this.currentTimeout) {
      clearTimeout(this.currentTimeout)
    }
    this.currentTimeout = undefined
  }

  protected async downloadEntrypoint() {
    return loadGamekitEntrypoint(names => this.loadAPIs(names))
  }

  onStartFunctions: Array<Function> = []
  onUpdateFunctions: Array<(dt: number) => void> = []
  onEventFunctions: Array<(event: any) => void> = []

  fireEvent(event: any) {
    try {
      for (let trigger of this.onEventFunctions) {
        trigger(event)
      }
    } catch (e) {
      defaultLogger.error('', e)
    }
  }

  setupDevtools() {
    this.devToolsAdapter = new DevTools(this.devTools)
  }

  /**
   * Set this member to `true` if you don't need `onUpdate` to be called.
   */
  managedUpdateCalls: boolean = false

  enqueueInitMessagesFinished() {
    this.outboundEventQueue.push({ type: 'SceneStarted', tag: 'scene', payload: '{}' })
  }

  fixupDeprecations() {
    /**
     * `manualUpdate` is now called `managedUpdateCalls`
     */
    Object.defineProperty(this, 'manualUpdate', {
      get: () => this.managedUpdateCalls,
      set: (value: boolean) => (this.managedUpdateCalls = value),
      enumerable: false
    })
  }

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
}
