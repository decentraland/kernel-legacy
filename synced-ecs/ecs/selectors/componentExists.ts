import { ECS } from '../EntityComponentState'
import { ComponentId } from '../Component'

export function componentExists(state: ECS, componentId: ComponentId) {
  if (typeof componentId === 'string') {
    return state.componentsById[componentId] !== undefined
  } else {
    return componentId !== undefined && state.componentsById[componentId] !== undefined
  }
}
