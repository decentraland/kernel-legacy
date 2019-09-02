import { ECS } from '../../EntityComponentState'
import { getEntityParent } from '../../selectors/getEntityParent'
import { EntityId } from '../../Entity'

export function parentChanged(from: ECS, to: ECS, entityId: EntityId) {
  return getEntityParent(from, entityId) !== getEntityParent(to, entityId)
}
