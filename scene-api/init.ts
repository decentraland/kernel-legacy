import { DecentralandSynchronizationSystem } from './engine/Implementation'

// ECS INITIALIZATION
import { ECSEngine } from './ecs/ECSEngine'
import { Entity } from './ecs/Entity'

const entity = new Entity('scene')
;(entity as any).uuid = '0'

// Initialize engine
/** @public */
const engine = new ECSEngine(entity)

import { DisposableComponent } from './ecs/Component'
DisposableComponent.engine = engine

// Initialize Decentraland interface
/** @internal */
import { DecentralandInterface } from './engine/Types'

/** @internal */
declare let dcl: DecentralandInterface | void
if (typeof dcl !== 'undefined') {
  engine.addSystem(new DecentralandSynchronizationSystem(dcl), Infinity)
}
// Initialize UUID Events system
engine.addSystem(uuidEventSystem)

import { uuidEventSystem } from './engine/Systems'

export { engine }
