import { ECS } from '../EntityComponentState'

export function getComponentClasses(state: ECS) {
  return Object.keys(state.componentClassToName)
}
