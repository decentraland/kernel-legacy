export type PositionSettlementState = {
  isTeleporting: boolean
  isSettled: boolean
}

export type RootPositionSettlementState = {
  positionSettlement: PositionSettlementState
}