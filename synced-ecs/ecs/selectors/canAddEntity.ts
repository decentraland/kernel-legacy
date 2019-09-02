import { ECS } from '../EntityComponentState'
import { EntityId } from '../EntityId'

export function canAddEntity(state: ECS, entityId: EntityId, parentId: EntityId): boolean {
  if (state.entityComponents[entityId] !== undefined) {
    console.log('no falsy', state.entityComponents)
    return false
  }
  if (state.entityComponents[parentId] === undefined) {
    console.log('no falsy parent', state.entityComponents)
    return false
  }
  if (typeof entityId !== 'string') {
    console.log('no stringy entityIs', entityId)
    return false
  }
  return true
}
