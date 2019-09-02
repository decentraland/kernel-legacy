import { ECS } from '../EntityComponentState'
import { ComponentClassId, ComponentName } from '../Component'
import { canAddComponentClass } from '../selectors/canAddComponentClass'

export function addComponentClass(state: ECS, classId: ComponentClassId, className: ComponentName): ECS {
  if (!canAddComponentClass(state, classId, className)) {
    return state
  }
  return {
    ...state,
    componentsByClass: { ...state.componentsByClass, [classId]: [] },
    componentClassToName: { ...state.componentClassToName, [classId]: className },
    componentNameToClass: { ...state.componentNameToClass, [className]: classId }
  }
}
