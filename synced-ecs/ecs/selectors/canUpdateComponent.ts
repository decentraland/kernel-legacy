import { ECS } from '../EntityComponentState'
import { ComponentId } from '../Component'

export function canUpdateComponent(state: ECS, componentId: ComponentId): boolean {
  return componentId !== undefined && state.componentsById[componentId] !== undefined
}
