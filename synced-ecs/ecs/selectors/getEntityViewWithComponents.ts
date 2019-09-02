import { EntityId, EntityView } from '../Entity'
import { ECS } from '../EntityComponentState'
import { getComponentName } from './getComponentName'
import { getComponentClassId } from '../reducers/removeComponent'
import { getComponent } from './getComponent'
import { ComponentId } from '../Component'

export function getEntityViewWithComponents(state: ECS, entityId: EntityId, componentIds: ComponentId[]): EntityView {
  const components = componentIds.reduce((cumm, componentId) => {
    cumm[getComponentName(state, getComponentClassId(state, componentId))] = getComponent(state, componentId)
    return cumm
  }, {})
  return {
    entityId,
    components
  }
}
