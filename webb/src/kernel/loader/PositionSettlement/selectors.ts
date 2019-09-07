import { RootPositionSettlementState } from './types'

export function isPositionSettled(state: RootPositionSettlementState) {
  return state.positionSettlement.isSettled
}
