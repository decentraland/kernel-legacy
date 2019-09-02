import { ECS } from '../EntityComponentState'

export function getComponentIds(state: ECS) {
  return Object.keys(state.componentsById)
}
