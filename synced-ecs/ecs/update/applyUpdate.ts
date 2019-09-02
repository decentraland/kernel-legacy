import { ECS } from '../EntityComponentState'
import { lookupTable } from './lookupTable'
import { Update } from './Update'
export function applyUpdate(state: ECS, update: Update) {
  return lookupTable[update.type](state, ...update.payload)
}
