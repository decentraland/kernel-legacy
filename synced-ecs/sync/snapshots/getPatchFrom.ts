import { Diff } from '../../ecs/compare/Diff'
import { emptyDiff } from '../../ecs/compare/emptyDiff'
import { StateStore } from './StateStore'
import { mergeDiffs } from '../../ecs/compare/mergeDiffs'

export function getPatchFrom(state: StateStore, time: number): Diff | null {
  let result = emptyDiff()
  while (time !== state.time) {
    if (!state.deltas[time]) {
      return null
    } else {
      result = mergeDiffs(result, state.deltas[time])
      time = state.deltaTarget[time]
    }
  }
  return result
}
