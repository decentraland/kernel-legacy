import { ECS } from '../EntityComponentState'
import { ComponentClassId } from '../Component'

export function canRemoveComponentClass(state: ECS, classId: ComponentClassId) {
  return state.componentsByClass[classId] !== undefined && state.componentsByClass[classId].length === 0
}
