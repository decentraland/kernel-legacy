import { EntityId } from '../Entity'
import { EntityComponentState } from '../EntityComponentState'

export function isChildOf(state: EntityComponentState, entityId: EntityId, parentId: EntityId) {
  return (
    state.parent[parentId] !== undefined && state.parent[entityId] !== undefined && state.parent[entityId] === parentId
  )
}
