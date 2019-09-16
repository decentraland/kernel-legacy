export type PositionSettlementState = {
  isTeleporting: boolean
  isSettled: boolean
}

export type RootPositionSettlementState = {
  positionSettlement: PositionSettlementState
}

export const UNSETTLE_POSITION = 'Unsettle position'
export const TELEPORT = 'Teleporting'
export const SETTLE_POSITION = 'Settle position'