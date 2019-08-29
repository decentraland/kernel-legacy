import {
  CreateEntityPayload,
  RemoveEntityPayload,
  UpdateEntityComponentPayload,
  AttachEntityComponentPayload,
  ComponentRemovedPayload,
  SetEntityParentPayload,
  ComponentCreatedPayload,
  ComponentDisposedPayload,
  ComponentUpdatedPayload
} from '@dcl/utils'
import { ISceneRunningScript } from '../../types/ISceneRunningScript'

const engineMethodMatches = /^(engine\.)/

export function generateECSInterface(that: ISceneRunningScript) {
  return {
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

    /** called after adding a component to the entity or after updating a component */
    updateEntityComponent(entityId: string, componentName: string, classId: number, json: string): void {
      if (engineMethodMatches.test(componentName)) {
        that.events.push({
          type: 'UpdateEntityComponent',
          tag: entityId + '_' + classId,
          payload: JSON.stringify({
            entityId,
            classId,
            name: componentName.replace(engineMethodMatches, ''),
            json
          } as UpdateEntityComponentPayload)
        })
      }
    },

    /** called after adding a DisposableComponent to the entity */
    attachEntityComponent(entityId: string, componentName: string, id: string): void {
      if (engineMethodMatches.test(componentName)) {
        that.events.push({
          type: 'AttachEntityComponent',
          tag: entityId,
          payload: JSON.stringify({
            entityId,
            name: componentName.replace(engineMethodMatches, ''),
            id
          } as AttachEntityComponentPayload)
        })
      }
    },

    /** call after removing a component from the entity */
    removeEntityComponent(entityId: string, componentName: string): void {
      if (engineMethodMatches.test(componentName)) {
        that.events.push({
          type: 'ComponentRemoved',
          tag: entityId,
          payload: JSON.stringify({
            entityId,
            name: componentName.replace(engineMethodMatches, '')
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

    componentCreated(id: string, componentName: string, classId: number) {
      if (engineMethodMatches.test(componentName)) {
        that.events.push({
          type: 'ComponentCreated',
          tag: id,
          payload: JSON.stringify({
            id,
            classId,
            name: componentName.replace(engineMethodMatches, '')
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
    }
  }
}
