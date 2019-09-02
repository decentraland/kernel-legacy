import { ECS } from '../EntityComponentState'
import { ComponentClassId } from '../Component'

export function getComponentName(state: ECS, classId: ComponentClassId) {
  return state.componentClassToName[classId]
}
