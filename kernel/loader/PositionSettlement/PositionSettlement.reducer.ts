import {
  PositionSettlementState,
  PositionSettlementAction,
  SETTLE_POSITION,
  UNSETTLE_POSITION
} from './PositionSettlement.types'

export const INITIAL_POSITION_SETTLEMENT_STATE: PositionSettlementState = {
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
        isSettled: true
      }
    case UNSETTLE_POSITION:
      return {
        isSettled: false
      }
    default:
      return state
  }
}
