import { PositionSettlementState } from './types'
import { PositionSettlementAction } from './actions'
import { SETTLE_POSITION, UNSETTLE_POSITION, TELEPORT } from './types'

export const INITIAL_POSITION_SETTLEMENT_STATE: PositionSettlementState = {
  isTeleporting: false,
  isSettled: false
}

export function positionSettlementReducer(
  state?: PositionSettlementState,
  action?: PositionSettlementAction
): PositionSettlementState {
  if (!state) {
    return INITIAL_POSITION_SETTLEMENT_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case SETTLE_POSITION:
      return {
        isTeleporting: false,
        isSettled: true
      }
    case TELEPORT:
      return {
        isTeleporting: true,
        isSettled: state.isSettled
      }
    case UNSETTLE_POSITION:
      return {
        isTeleporting: state.isTeleporting,
        isSettled: false
      }
    default:
      return state
  }
}
