import { EntityComponentState } from '../EntityComponentState'
import { generateStringId } from '../util/generateStringId'

export function emptyState() {
  const [rootEntityId, seed] = generateStringId(0)
  return {
    seed,
    rootEntityId,
    entities: [rootEntityId],
    parent: { [rootEntityId]: rootEntityId },
    componentsById: {},
    componentParent: {},
    componentClass: {},
    entityComponents: {
      [rootEntityId]: []
    },
    componentsByClass: {},
    componentNameToClass: {},
    componentClassToName: {}
  } as EntityComponentState
}
