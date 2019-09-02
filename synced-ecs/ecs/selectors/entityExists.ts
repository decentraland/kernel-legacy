import { ECS } from '../EntityComponentState'
import { EntityId } from '../Entity'

export function entityExists(state: ECS, entityId: EntityId) {
  return state.entityComponents[entityId] !== undefined
}
