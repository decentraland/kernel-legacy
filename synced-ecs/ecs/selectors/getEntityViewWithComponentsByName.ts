import { ComponentName } from '../Component'
import { EntityId, EntityView } from '../Entity'
import { ECS } from '../EntityComponentState'
import { getComponentClassId } from '../reducers/removeComponent'

export function getEntityViewWithComponents(
  state: ECS,
  entityId: EntityId,
  componentNames: ComponentName[]
): EntityView {
  const components = componentNames.map(_ => getComponentClassId(state, _))
  return getEntityViewWithComponents(state, entityId, components)
}
