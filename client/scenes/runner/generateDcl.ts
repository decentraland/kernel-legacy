import {
  CreateEntityPayload,
  RemoveEntityPayload,
  UpdateEntityComponentPayload,
  AttachEntityComponentPayload,
  ComponentRemovedPayload,
  SetEntityParentPayload,
  ComponentCreatedPayload,
  ComponentDisposedPayload,
  ComponentUpdatedPayload,
  EntityAction
} from '@dcl/utils'
import { EventSubscriber } from '@dcl/rpc-client'

const componentNameRE = /^(engine\.)/

const WEB3_PROVIDER = 'web3-provider'
const PROVIDER_METHOD = 'getProvider'

export interface ISceneRunningScript {
  onLog: (...args: any) => void
  onError: (...args: any) => void
  onUpdateFunctions: Function[]
  onEventFunctions: Function[]
  onStartFunctions: Function[]
  fireEvent: any
  eventSubscriber: EventSubscriber
  events: EntityAction[]
}

export function generateInterface(that: ISceneRunningScript) {
  return {
    DEBUG: true,
    log(...args) {
      // tslint:disable-next-line:no-console
      that.onLog(...args)
    },

    addEntity(entityId: string) {
      if (entityId === '0') {
        // We dont create the entity 0 in the engine.
        return
      }
      that.events.push({
        type: 'CreateEntity',
        tag: entityId,
        payload: JSON.stringify({ id: entityId } as CreateEntityPayload)
      })
    },

    removeEntity(entityId: string) {
      that.events.push({
        type: 'RemoveEntity',
        tag: entityId,
        payload: JSON.stringify({ id: entityId } as RemoveEntityPayload)
      })
    },

    /** update tick */
    onUpdate(cb: (deltaTime: number) => void): void {
      if (typeof (cb as any) !== 'function') {
        that.onError(new Error('onUpdate must be called with only a function argument'))
      } else {
        that.onUpdateFunctions.push(cb)
      }
    },

    /** event from the engine */
    onEvent(cb: (event: any) => void): void {
      if (typeof (cb as any) !== 'function') {
        that.onError(new Error('onEvent must be called with only a function argument'))
      } else {
        that.onEventFunctions.push(cb)
      }
    },

    /** called after adding a component to the entity or after updating a component */
    updateEntityComponent(entityId: string, componentName: string, classId: number, json: string): void {
      if (componentNameRE.test(componentName)) {
        that.events.push({
          type: 'UpdateEntityComponent',
          tag: entityId + '_' + classId,
          payload: JSON.stringify({
            entityId,
            classId,
            name: componentName.replace(componentNameRE, ''),
            json
          } as UpdateEntityComponentPayload)
        })
      }
    },

    /** called after adding a DisposableComponent to the entity */
    attachEntityComponent(entityId: string, componentName: string, id: string): void {
      if (componentNameRE.test(componentName)) {
        that.events.push({
          type: 'AttachEntityComponent',
          tag: entityId,
          payload: JSON.stringify({
            entityId,
            name: componentName.replace(componentNameRE, ''),
            id
          } as AttachEntityComponentPayload)
        })
      }
    },

    /** call after removing a component from the entity */
    removeEntityComponent(entityId: string, componentName: string): void {
      if (componentNameRE.test(componentName)) {
        that.events.push({
          type: 'ComponentRemoved',
          tag: entityId,
          payload: JSON.stringify({
            entityId,
            name: componentName.replace(componentNameRE, '')
          } as ComponentRemovedPayload)
        })
      }
    },

    /** set a new parent for the entity */
    setParent(entityId: string, parentId: string): void {
      that.events.push({
        type: 'SetEntityParent',
        tag: entityId,
        payload: JSON.stringify({
          entityId,
          parentId
        } as SetEntityParentPayload)
      })
    },

    /** subscribe to specific events, events will be handled by the onEvent function */
    subscribe(eventName: string): void {
      that.eventSubscriber.on(eventName, event => {
        that.fireEvent({ type: eventName, data: event.data })
      })
    },

    /** unsubscribe to specific event */
    unsubscribe(eventName: string): void {
      that.eventSubscriber.off(eventName)
    },

    componentCreated(id: string, componentName: string, classId: number) {
      if (componentNameRE.test(componentName)) {
        that.events.push({
          type: 'ComponentCreated',
          tag: id,
          payload: JSON.stringify({
            id,
            classId,
            name: componentName.replace(componentNameRE, '')
          } as ComponentCreatedPayload)
        })
      }
    },

    componentDisposed(id: string) {
      that.events.push({
        type: 'ComponentDisposed',
        tag: id,
        payload: JSON.stringify({ id } as ComponentDisposedPayload)
      })
    },

    componentUpdated(id: string, json: string) {
      that.events.push({
        type: 'ComponentUpdated',
        tag: id,
        payload: JSON.stringify({
          id,
          json
        } as ComponentUpdatedPayload)
      })
    },

    loadModule: async _moduleName => {
      const moduleToLoad = _moduleName.replace(/^@decentraland\//, '')
      let methods: string[] = []

      if (moduleToLoad === WEB3_PROVIDER) {
        methods.push(PROVIDER_METHOD)
        this.provider = await this.getEthereumProvider()
      } else {
        const proxy = (await this.loadAPIs([moduleToLoad]))[moduleToLoad]

        try {
          methods = await proxy._getExposedMethods()
        } catch (e) {
          throw Object.assign(new Error(`Error getting the methods of ${moduleToLoad}: ` + e.message), {
            original: e
          })
        }
      }

      return {
        rpcHandle: moduleToLoad,
        methods: methods.map(name => ({ name }))
      }
    },
    callRpc: async (rpcHandle: string, methodName: string, args: any[]) => {
      if (rpcHandle === WEB3_PROVIDER && methodName === PROVIDER_METHOD) {
        return this.provider
      }

      const module = this.loadedAPIs[rpcHandle]
      if (!module) {
        throw new Error(`RPCHandle: ${rpcHandle} is not loaded`)
      }
      return module[methodName].apply(module, args)
    },
    onStart(cb: Function) {
      that.onStartFunctions.push(cb)
    },
    error(message, data) {
      that.onError(Object.assign(new Error(message), { data }))
    }
  }
}
