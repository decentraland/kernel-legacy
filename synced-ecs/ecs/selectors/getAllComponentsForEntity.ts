import { ComponentId } from '../Component'
import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function getAllComponentsForEntity(state: ECS, entityId: EntityId) {
  return state.entityComponents[entityId] as ComponentId[]
}
