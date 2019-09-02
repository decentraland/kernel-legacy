import { ECS } from '../EntityComponentState'

export function getEntityIds(state: ECS) {
  return state.entities
}
