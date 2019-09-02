import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { entityExists } from './entityExists'
import { isDescendantOf } from './isDescendantOf'

export function canChangeEntityParent(state: ECS, entityId: EntityId, parentId: EntityId) {
  if (typeof entityId !== 'string' || typeof parentId !== 'string') {
    return false
  }
  return entityExists(state, parentId) && !isDescendantOf(state, parentId, entityId)
}
