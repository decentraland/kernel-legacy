import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { entityExists } from './entityExists'
import { isRootEntity } from './isRootEntity'
import { entityHasComponents } from './entityHasComponents'
import { entityHasChildrenEntities } from './entityHasChildrenEntities'

export function canRemoveEntity(state: ECS, entityId: EntityId): boolean {
  if (!entityExists(state, entityId)) {
    return false
  }
  if (isRootEntity(state, entityId)) {
    return false
  }
  if (entityHasChildrenEntities(state, entityId)) {
    return false
  }
  if (entityHasComponents(state, entityId)) {
    return false
  }
  return true
}
