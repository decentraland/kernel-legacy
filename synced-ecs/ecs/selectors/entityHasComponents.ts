import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function entityHasComponents(state: ECS, entityId: EntityId): boolean {
  return state.entityComponents[entityId].length > 0
}
