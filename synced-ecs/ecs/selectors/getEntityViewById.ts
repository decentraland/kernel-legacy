import { EntityId, EntityView } from '../Entity'
import { ECS } from '../EntityComponentState'
import { getAllComponentsForEntity } from './getAllComponentsForEntity'
import { getEntityViewWithComponents } from './getEntityViewWithComponents'

export function getEntityViewById(state: ECS, entityId: EntityId): EntityView {
  const allComponents = getAllComponentsForEntity(state, entityId)
  return getEntityViewWithComponents(state, entityId, allComponents)
}
