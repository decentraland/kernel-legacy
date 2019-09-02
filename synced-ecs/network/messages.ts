import { Update } from '../ecs/update/Update'

export const KEY = '_'

export const FROM = 'a'
export const TO = 'b'
export const EVENT = 'c'
export const LOOKUP_ID = 'd'
export const SINCE = 'e'
export const UNTIL = 'f'
export const DATA = 'g'
export const AUTHORITY = 'h'

export const PRESENCE = 'p'
export const QUERY_PRESENCE = 'b'
export const AUTHORITY_QUERY = 'z'
export const AUTHORITY_ANNOUNCEMENT = 'y'
export const UUID_EVENT = 'u'
export const REQUEST_SNAPSHOT = 'r'
export const SNAPSHOT = 's'
export const REQUEST_DELTA = 'd'
export const TRY_SNAPSHOT = 't'
export const DELTA = 'e'

export interface CommsMessage {
  [KEY]: string
  /**
   * Sender
   */
  [FROM]: string
  /**
   * Receiver
   */
  [TO]?: string
}

export interface PresenceMessage extends CommsMessage {
  [KEY]: typeof PRESENCE
  [TO]: undefined
}

export interface QueryPresenceMessage extends CommsMessage {
  [KEY]: typeof QUERY_PRESENCE
  [TO]: string
}

export interface AuthorityQueryMessage extends CommsMessage {
  [KEY]: typeof AUTHORITY_QUERY
  [TO]: undefined
}

export interface AuthorityAnnouncementMessage extends CommsMessage {
  [KEY]: typeof AUTHORITY_ANNOUNCEMENT
  [AUTHORITY]: string
}

export interface UUIDMessage extends CommsMessage {
  [KEY]: typeof UUID_EVENT
  [TO]: string
  [EVENT]: any
}

export interface RequestSnapshot extends CommsMessage {
  [KEY]: typeof REQUEST_SNAPSHOT
  [TO]: undefined
  [LOOKUP_ID]: string
}

export interface Snapshot extends CommsMessage {
  [KEY]: typeof SNAPSHOT
  [TO]: string
  [LOOKUP_ID]: string
}

export interface TrySnapshot extends CommsMessage {
  [KEY]: typeof TRY_SNAPSHOT
  [TO]: string
  [LOOKUP_ID]: string
}

export interface RequestDelta extends CommsMessage {
  [KEY]: typeof REQUEST_DELTA
  [TO]: undefined
  [LOOKUP_ID]: string
  [SINCE]?: number
}

export interface DeltaMessage extends CommsMessage {
  [KEY]: typeof DELTA
  [TO]: string
  [DATA]: Update[]
  [LOOKUP_ID]: string
  [UNTIL]: number
}
