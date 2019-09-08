import { action } from 'typesafe-actions'
import { TELEPORT, SETTLE_POSITION, UNSETTLE_POSITION } from './types'

export const teleport = (position: string) => action(TELEPORT, { position })
export type TeleportAction = ReturnType<typeof teleport>

export const settlePosition = () => action(SETTLE_POSITION)
export type SettlePositionAction = ReturnType<typeof settlePosition>

export const unsettlePosition = () => action(UNSETTLE_POSITION)
export type UnsettlePositionAction = ReturnType<typeof unsettlePosition>

export type PositionSettlementAction = SettlePositionAction | UnsettlePositionAction | TeleportAction
