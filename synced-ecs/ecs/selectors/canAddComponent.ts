import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { ComponentClassId, ComponentId } from '../Component'

export function canAddComponent(
  state: ECS,
  entityId: EntityId,
  componentClassId: ComponentClassId,
  componentId: ComponentId
): boolean {
  if (state.componentsByClass[componentClassId] === undefined) {
    console.log('no component class', componentClassId)
    return false
  }
  if (state.componentsById[componentId] !== undefined) {
    console.log('clashing id', componentId)
    return false
  }
  if (state.entityComponents[entityId] === undefined) {
    console.log('no entityComponents', entityId)
    return false
  }
  return true
}
