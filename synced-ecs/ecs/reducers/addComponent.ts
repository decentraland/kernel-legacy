import { Component, ComponentClassId, ComponentId } from '../Component'
import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'
import { canAddComponent } from '../selectors/canAddComponent'
import { generateStringId } from '../util/generateStringId'

export function addComponent(
  state: ECS,
  entityId: EntityId,
  classId: ComponentClassId,
  component: Component,
  _id?: ComponentId
): ECS {
  const [componentId, seed] = _id === undefined ? generateStringId(state.seed) : [_id, state.seed]
  if (!canAddComponent(state, entityId, classId, componentId)) {
    return state
  }
  return {
    ...state,
    seed,
    componentsById: { ...state.componentsById, [componentId]: component },
    componentParent: { ...state.componentParent, [componentId]: entityId },
    componentClass: { ...state.componentClass, [componentId]: classId },
    componentsByClass: {
      ...state.componentsByClass,
      [classId]: [...state.componentsByClass[classId], componentId]
    },
    entityComponents: {
      ...state.entityComponents,
      [entityId]: [...state.entityComponents[entityId], componentId]
    }
  }
}
