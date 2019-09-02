import { ECS } from '../EntityComponentState'
import { ComponentClassId } from '../Component'

export function hasComponentClass(state: ECS, componentClass: ComponentClassId) {
  return state.componentClassToName[componentClass] !== undefined
}
