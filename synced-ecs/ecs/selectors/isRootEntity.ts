import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function isRootEntity(state: ECS, entityId: EntityId) {
  return state.rootEntityId === entityId
}
