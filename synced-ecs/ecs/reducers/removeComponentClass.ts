import { ECS } from '../EntityComponentState'
import { ComponentClassId } from '../Component'
import { canRemoveComponentClass } from '../selectors/canRemoveComponentClass'

export function removeComponentClass(state: ECS, classId: ComponentClassId): ECS {
  if (!canRemoveComponentClass(state, classId)) {
    return state
  }
  const { componentsByClass, componentClassToName, componentNameToClass } = state
  delete componentsByClass[classId]
  delete componentClassToName[classId]
  delete componentNameToClass[state.componentClassToName[classId]]
  return {
    ...state,
    componentsByClass,
    componentClassToName,
    componentNameToClass
  }
}
