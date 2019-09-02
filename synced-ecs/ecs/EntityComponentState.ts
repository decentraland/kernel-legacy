import { EntityId } from './EntityId'
import { ComponentId, Component, ComponentClassId, ComponentName } from './Component'

export interface EntityComponentState {
  seed: number

  rootEntityId: EntityId

  entities: EntityId[]

  parent: Record<EntityId, EntityId>

  componentsById: Record<ComponentId, Component>

  componentParent: Record<ComponentId, EntityId>

  entityComponents: Record<EntityId, ComponentId[]>

  componentsByClass: Record<ComponentClassId, ComponentId[]>

  componentClass: Record<ComponentId, ComponentClassId>

  componentNameToClass: Record<ComponentName, ComponentClassId>

  componentClassToName: Record<ComponentClassId, ComponentName>
}

export type ECS = EntityComponentState
