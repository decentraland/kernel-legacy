// CORE DEPENDENCIES
export * from './ecs/Engine'
export * from './ecs/Component'
export * from './ecs/Entity'
export * from './ecs/Task'
export * from './ecs/helpers'
export * from './ecs/Observable'
export * from './ecs/UIValue'

import { DecentralandSynchronizationSystem } from './decentraland/Implementation'

// ECS INITIALIZATION
import { Engine } from './ecs/Engine'

// Initialize engine
/** @public */
const engine = new Engine()

import { DisposableComponent } from './ecs/Component'
DisposableComponent.engine = engine

// Initialize Decentraland interface
/** @internal */
import { DecentralandInterface } from './decentraland/Types'

/** @internal */
declare let dcl: DecentralandInterface
if (typeof dcl !== 'undefined') {
  engine.addSystem(new DecentralandSynchronizationSystem(dcl), Infinity)
}

import { UUIDEventSystem } from './decentraland/Systems'

// Initialize UUID Events system
/** @internal */
const uuidEventSystem = new UUIDEventSystem()
engine.addSystem(uuidEventSystem)

// DECENTRALAND DEPENDENCIES
export * from './decentraland/Types'
export * from './decentraland/Components'
export * from './decentraland/Systems'
export * from './decentraland/Events'
export * from './decentraland/Camera'
export * from './decentraland/math'
export * from './decentraland/AnimationClip'
export * from './decentraland/Input'
export * from './decentraland/Audio'
export * from './decentraland/Gizmos'
export * from './decentraland/UIShapes'

export { engine }
