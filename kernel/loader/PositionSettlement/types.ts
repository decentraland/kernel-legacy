import { action } from 'typesafe-actions'

export type PositionSettlementState = {
  isSettled: boolean
}

export const SETTLE_POSITION = 'Settle position'
export const settlePosition = () => action(SETTLE_POSITION)
export type SettlePositionAction = ReturnType<typeof settlePosition>

export const UNSETTLE_POSITION = 'Unsettle position'
export const unsettlePosition = () => action(UNSETTLE_POSITION)
export type UnsettlePositionAction = ReturnType<typeof unsettlePosition>

export type PositionSettlementAction = SettlePositionAction | UnsettlePositionAction
