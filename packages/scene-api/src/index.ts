// UTILS
export * from '@dcl/utils/Task'
export * from '@dcl/utils/Logger'
export * from '@dcl/utils/Observable'

// CORE DEPENDENCIES
export * from './ecs/ECSEngine'
export * from './ecs/Component'
export * from './ecs/Entity'
export * from './ecs/IEntity'
export * from './ecs/UIValue'
export * from './ecs/EventManager'

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

import { uuidEventSystem } from './engine/Systems'

// Initialize UUID Events system
engine.addSystem(uuidEventSystem)

// DECENTRALAND DEPENDENCIES
export * from '@dcl/utils/math'
export * from './engine/Types'
export * from './engine/Components'
export * from './engine/Systems'
export * from './engine/Events'
export * from './engine/Camera'
export * from './engine/AnimationState'
export * from './engine/Input'
export * from './engine/Audio'
export * from './engine/Gizmos'
export * from './engine/UIShapes'
export * from './engine/AvatarShape'
export * from './engine/UIEvents'
export * from './engine/MessageBus'

export { engine }
