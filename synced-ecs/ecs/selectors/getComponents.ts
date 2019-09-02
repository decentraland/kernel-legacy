import { ECS } from '../EntityComponentState'
import { Component } from '../Component'

export function getComponents(state: ECS): Component[] {
  return Object.keys(state.componentsById).map(_ => state.componentsById[_])
}
