import { PeerPresence } from './peers/peerPresence'
import { PROTOCOL_PING, ProtocolPingAction, PROTOCOL_POSITION, ProtocolPositionAction } from '../comms/actions'

export type PresenceStore = {
  commsAliasToUserId: {
    [alias: number]: string
  }
  myUserId: string
  lastTimestampReceivedByUserId: {
    [userId: string]: number
  }
  presenceByUserId: {
    [userId: string]: PeerPresence
  }
}

export type RootPresenceStore = {}

export const INITIAL_PRESENCE_STATE = {
  commsAliasToUserId: {},
  myUserId: '',
  lastTimestampReceivedByUserId: {},
  presenceByUserId: {}
}

export function presenceReducer(store?: PresenceStore, action?: any): PresenceStore {
  if (!store) {
    return INITIAL_PRESENCE_STATE
  }
  if (!action || !action.type || !(typeof action.type === 'string')) {
    return store
  }
  switch (action.type) {
    case PROTOCOL_PING:
      ; (action as ProtocolPingAction).payload.ping
      break
    case PROTOCOL_POSITION:
      ; (action as ProtocolPositionAction).payload
      break
  }
  return store
}
