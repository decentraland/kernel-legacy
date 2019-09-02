import { EntityId } from '../EntityId'
import { ComponentClassId, Component, ComponentId, ComponentName } from '../Component'

export interface Diff {
  newEntityIds: EntityId[]
  removedEntityIds: EntityId[]
  newParents: [/* child */ EntityId, /* parent */ EntityId][]
  newComponentClasses: [ComponentClassId, ComponentName][]
  removedComponentClasses: ComponentClassId[]
  newComponents: [EntityId, Component][]
  removedComponents: ComponentId[]
  updatedComponents: Component[]
}
