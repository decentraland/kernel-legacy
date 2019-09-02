import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function isParentOf(state: ECS, childEntityId: EntityId, parentEntityId: EntityId) {
  if (childEntityId === parentEntityId) {
    return false
  }
  return state.parent[childEntityId] === parentEntityId
}
