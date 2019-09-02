import { EntityId } from '../Entity'
import { ECS } from '../EntityComponentState'
import { isChildOf } from './isChildOf'

export function isChildOfRoot(state: ECS, entityId: EntityId) {
  return isChildOf(state, entityId, state.rootEntityId)
}
