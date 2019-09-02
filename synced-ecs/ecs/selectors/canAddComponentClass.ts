import { ECS } from '../EntityComponentState'
import { ComponentClassId, ComponentName } from '../Component'

export function canAddComponentClass(state: ECS, classId: ComponentClassId, className: ComponentName): boolean {
  if (state.componentClassToName[classId] !== undefined) {
    return false
  }
  if (state.componentNameToClass[className] !== undefined) {
    return false
  }
  if (typeof classId !== 'string') {
    return false
  }
  if (typeof className !== 'string') {
    return false
  }
  return true
}
