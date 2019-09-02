import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { canChangeEntityParent } from '../selectors/canChangeEntityParent'

export function changeEntityParent(state: ECS, entityId: EntityId, parentId: EntityId): ECS {
  if (!canChangeEntityParent(state, entityId, parentId)) {
    return state
  }
  return {
    ...state,
    parent: { ...state.parent, [entityId]: parentId }
  }
}
