import { ECS } from '../EntityComponentState'
import { ComponentId, Component } from '../Component'
import { getComponent } from './getComponent'

export function canRemoveComponent(state: ECS, componentId: ComponentId | Component): boolean {
  return getComponent(state, componentId) !== undefined
}
