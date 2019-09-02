import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { canRemoveEntity } from '../selectors/canRemoveEntity'

export function removeEntity(state: ECS, entityId: EntityId): ECS {
  if (!canRemoveEntity(state, entityId)) {
    return state
  }
  const parent = { ...state.parent }
  delete parent[entityId]
  const entityComponents = { ...state.entityComponents }
  delete entityComponents[entityId]
  return {
    ...state,
    entities: state.entities.filter(_ => _ !== entityId),
    parent,
    entityComponents
  }
}
