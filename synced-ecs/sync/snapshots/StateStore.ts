import { EntityComponentState } from '../../ecs/EntityComponentState'
import { Diff } from '../../ecs/compare/Diff'

export interface StateStore {
  time: number
  currentState: EntityComponentState
  deltas: {
    [time: number]: Diff
  }
  deltaTarget: {
    [time: number]: number
  }
}
