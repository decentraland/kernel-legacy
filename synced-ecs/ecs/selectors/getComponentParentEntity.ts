import { ECS } from '../EntityComponentState'
import { EntityId } from '../Entity'
import { ComponentId } from '../Component'

export function getComponentParentEntity(state: ECS, component: ComponentId): EntityId {
  return state.componentParent[component]
}
