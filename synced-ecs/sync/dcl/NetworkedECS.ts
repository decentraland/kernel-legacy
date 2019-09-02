import { NetworkedState } from '../../network/NetworkedState'
import { PeerAuthoritySystem } from '../../network/systems/PeerAuthoritySystem'

import { DecentralandInterface } from '../../scene-api-interface/DCL'
import { ISystem } from '../../scene-api-interface/ISystem'
import { IEngine } from '../../scene-api-interface/IEngine'
import { MessageBus } from '../../scene-api-mocks/MessageBus'
import {
  ComponentAdded,
  ComponentRemoved,
  DisposableComponentCreated,
  DisposableComponentRemoved,
  DisposableComponentUpdated,
  ParentChanged
} from '../../scene-api-interface/ECSEvents'
import { IEvent } from '../../scene-api-interface/IEvent'

export class NetworkedDCLSystem implements ISystem {
  constructor(
    public dcl: DecentralandInterface,
    public bus: MessageBus,
    public networkedState: NetworkedState,
    public authority: PeerAuthoritySystem
  ) {}

  /**
   * Link to the ECS Engine
   */
  engine!: IEngine

  activate(engine: IEngine) {
    this.engine = engine
    this.setupECSListeners()
    this.dcl.onEvent((event: IEvent) => {
      if (event.type === 'uuidEvent') {
        // this.bus.emit('uuidEvent', event.data)
      }
    })
  }

  onAddEntity() {}
  onRemoveEntity() {}
  onComponentAdded(event: IEvent) {}
  onComponentRemoved(event: IEvent) {}
  onDisposableComponentCreated(event: IEvent) {}
  onDisposableComponentRemoved(event: IEvent) {}
  onDisposableComponentUpdated(event: IEvent) {}
  onParentChanged(event: IEvent) {}
  setupECSListeners() {
    this.engine.eventManager.addListener(ComponentAdded, this, this.onComponentAdded)
    this.engine.eventManager.addListener(ComponentRemoved, this, this.onComponentRemoved)
    this.engine.eventManager.addListener(DisposableComponentCreated, this, this.onDisposableComponentCreated)
    this.engine.eventManager.addListener(DisposableComponentRemoved, this, this.onDisposableComponentRemoved)
    this.engine.eventManager.addListener(DisposableComponentUpdated, this, this.onDisposableComponentUpdated)
    this.engine.eventManager.addListener(ParentChanged, this, this.onParentChanged)
  }

  onUpdate(_: number) {
    if (this.authority.areWeAuthoritative()) {
      this.networkPresentEntities()
    } else {
      this.localPresentEntities()
    }
  }

  networkPresentEntities() {}

  localPresentEntities() {}
}
