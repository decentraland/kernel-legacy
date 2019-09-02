import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { getEntityParent } from './getEntityParent'
import { isRootEntity } from './isRootEntity'

export function isDescendantOf(state: ECS, childEntityId: EntityId, parentEntityId: EntityId) {
  if (childEntityId === parentEntityId) {
    return true
  }
  if (isRootEntity(state, childEntityId)) {
    return false
  }
  return isDescendantOf(state, getEntityParent(state, childEntityId), parentEntityId)
}
