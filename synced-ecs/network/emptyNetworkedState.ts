import { generateId } from '../ecs/util/generateId'

export function emptyNetworkedState(timeOrId: number | string = 0, authority?: string) {
  const syncId = typeof timeOrId === 'number' ? generateId(timeOrId).toString() : timeOrId

  return {
    syncId,
    authority,
    registeredPeers: {}
  }
}
