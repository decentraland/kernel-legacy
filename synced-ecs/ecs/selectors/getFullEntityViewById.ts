import { EntityId, FullEntityView } from '../Entity'
import { ECS } from '../EntityComponentState'
import { getEntityChildren } from './getEntityChildren'
import { getEntityParent } from './getEntityParent'
import { getEntityViewById } from './getEntityViewById'

export function getFullEntityViewById(state: ECS, entityId: EntityId): FullEntityView {
  const entityView = getEntityViewById(state, entityId)
  return {
    ...entityView,
    parentId: getEntityParent(state, entityId),
    children: getEntityChildren(state, entityId).map(_ => getFullEntityViewById(state, _))
  }
}
