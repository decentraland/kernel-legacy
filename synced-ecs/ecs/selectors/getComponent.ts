import { ECS } from '../EntityComponentState'
import { Component, ComponentId } from '../Component'

export function getComponent(state: ECS, componentId: ComponentId): Component {
  return state.componentsById[componentId]
}
