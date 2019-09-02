import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { canAddEntity } from '../selectors/canAddEntity'
import { generateStringId } from '../util/generateStringId'

export function addEntity(state: ECS, entityId?: EntityId, parentId?: EntityId): ECS {
  const [id, seed] = entityId === undefined ? generateStringId(state.seed) : [entityId, state.seed]
  parentId = parentId === undefined ? state.rootEntityId : parentId
  if (!canAddEntity(state, id, parentId)) {
    return state
  }
  return {
    ...state,
    seed,
    entities: [...state.entities, id],
    parent: { ...state.parent, [id]: parentId },
    entityComponents: { ...state.entityComponents, [id]: [] }
  }
}
