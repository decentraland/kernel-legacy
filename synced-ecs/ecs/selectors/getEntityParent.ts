import { EntityId } from '../Entity'
import { ECS } from '../EntityComponentState'

export function getEntityParent(state: ECS, entity: EntityId) {
  return state.parent[entity]
}
