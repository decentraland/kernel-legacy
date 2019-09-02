import { ECS } from '../EntityComponentState'
import { Component, ComponentId } from '../Component'
import { canUpdateComponent } from '../selectors/canUpdateComponent'

export function updateComponent(state: ECS, componentId: ComponentId, component: Component): ECS {
  if (!canUpdateComponent(state, componentId)) {
    return state
  }
  return {
    ...state,
    componentsById: { ...state.componentsById, [componentId]: component }
  }
}
