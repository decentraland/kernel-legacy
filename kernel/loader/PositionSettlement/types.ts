export type PositionSettlementState = {
  isTeleporting: boolean
  isSettled: boolean
}

export type RootPositionSettlementState = {
  positionSettlementState: PositionSettlementState
}
