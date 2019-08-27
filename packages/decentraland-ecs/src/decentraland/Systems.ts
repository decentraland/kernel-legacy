import { Engine } from '../ecs/Engine'
import { UUIDEvent, PointerDownEvent, PointerUpEvent } from './Events'
import { DecentralandInterface } from './Types'
import { OnUUIDEvent } from './Components'
import { ISystem, ComponentAdded, ComponentRemoved, IEntity } from '../ecs/IEntity'
import { log } from 'util'

declare var dcl: DecentralandInterface | void

/**
 * @public
 */
export class PointerEventSystem implements ISystem {
  activate(_: Engine) {
    if (typeof dcl !== 'undefined') {
      dcl.subscribe('pointerUp')
      dcl.subscribe('pointerDown')
    }
  }

  deactivate() {
    if (typeof dcl !== 'undefined') {
      dcl.unsubscribe('pointerUp')
      dcl.unsubscribe('pointerDown')
    }
  }
}
/** @internal */
export const pointerEventSystem = new PointerEventSystem()

/**
 * @public
 */
export class UUIDEventSystem implements ISystem {
  handlerMap: { [uuid: string]: OnUUIDEvent<any> } = {}

  activate(engine: Engine) {
    engine.eventManager.addListener(UUIDEvent, this, this.handleEvent)
    engine.eventManager.addListener(ComponentAdded, this, this.componentAdded)
    engine.eventManager.addListener(ComponentRemoved, this, this.componentRemoved)

    engine.eventManager.addListener(PointerDownEvent, this, event => {
      log('pointer down')
    })

    engine.eventManager.addListener(PointerUpEvent, this, event => {
      log('pointer up')
    })

    if (typeof dcl !== 'undefined') {
      dcl.subscribe('uuidEvent')
    }
  }

  deactivate() {
    if (typeof dcl !== 'undefined') {
      dcl.unsubscribe('uuidEvent')
    }
  }

  onAddEntity(entity: IEntity) {
    for (let componentName in entity.components) {
      const component = entity.components[componentName]

      if (component instanceof OnUUIDEvent) {
        this.handlerMap[component.uuid] = component
      }
    }
  }

  onRemoveEntity(entity: IEntity) {
    for (let componentName in entity.components) {
      const component = entity.components[componentName]

      if (component instanceof OnUUIDEvent) {
        delete this.handlerMap[component.uuid]
      }
    }
  }

  private componentAdded(event: ComponentAdded) {
    if (event.entity.isAddedToEngine()) {
      const component = event.entity.components[event.componentName]

      if (component instanceof OnUUIDEvent) {
        this.handlerMap[component.uuid] = component
      }
    }
  }

  private componentRemoved(event: ComponentRemoved) {
    if (event.entity.isAddedToEngine()) {
      if (event.component instanceof OnUUIDEvent) {
        delete this.handlerMap[event.component.uuid]
      }
    }
  }

  private handleEvent(event: UUIDEvent): void {
    if (event.uuid in this.handlerMap) {
      const handler = this.handlerMap[event.uuid]
      if (handler) {
        if (handler.callback && 'call' in handler.callback) {
          handler.callback(event.payload)
        }
      }
    }
  }
}

/** @internal */
export const uuidEventSystem = new UUIDEventSystem()
