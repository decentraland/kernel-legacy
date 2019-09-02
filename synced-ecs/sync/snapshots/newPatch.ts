import { StateStore } from './StateStore'
import { generateDiff } from '../../ecs/compare/generateDiff'
import { ECS } from '../../ecs/EntityComponentState'

export function newPatch(stateStore: StateStore, state: ECS, newTime: number): StateStore {
  return {
    ...state,
    time: newTime,
    currentState: state,
    deltas: { ...stateStore.deltas, [stateStore.time]: generateDiff(stateStore.currentState, state) },
    deltaTarget: { ...stateStore.deltaTarget, [stateStore.time]: newTime }
  }
}
