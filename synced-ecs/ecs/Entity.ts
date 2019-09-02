import { Component } from './Component'
import { EntityId } from './EntityId'

export { EntityId }

export interface EntityView {
  entityId: EntityId
  components: {
    [componentName: string]: Component
  }
}

export interface FullEntityView {
  parentId: EntityId
  entityId: EntityId
  components: {
    [componentName: string]: Component
  }
  children: FullEntityView[]
}
