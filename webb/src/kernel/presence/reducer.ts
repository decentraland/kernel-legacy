import { PeerPresence } from './peers/peerPresence'

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
