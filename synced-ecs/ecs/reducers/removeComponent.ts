import { ECS } from '../EntityComponentState'
import { ComponentId, ComponentClassId } from '../Component'
import { canRemoveComponent } from '../selectors/canRemoveComponent'

export function getComponentClassId(state: ECS, componentId: ComponentId): ComponentClassId {
  return state.componentClass[componentId]
}

export function removeComponent(state: ECS, componentId: ComponentId): ECS {
  if (!canRemoveComponent(state, componentId)) {
    return state
  }

  const filterOutComponent = (_: any) => _ !== componentId
  const entityId = state.componentParent[componentId]
  const clazz = getComponentClassId(state, componentId)
  const componentsById = { ...state.componentsById }
  delete componentsById[componentId]
  const componentClass = { ...state.componentClass }
  delete componentClass[componentId]
  const componentParent = { ...state.componentParent }
  delete componentParent[componentId]
  const entityComponentMembers = state.entityComponents[entityId].filter(filterOutComponent)
  const componentsByClass = state.componentsByClass[clazz].filter(filterOutComponent)

  return {
    ...state,
    componentsById,
    componentParent,
    componentClass,
    componentsByClass: { ...state.componentsByClass, [clazz]: componentsByClass },
    entityComponents: {
      [entityId]: entityComponentMembers
    }
  }
}
