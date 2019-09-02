import { CommsMessage } from '../../network/messages'
import { decodeKey } from './decodeKey'

export function decodeMessage<T extends CommsMessage>(message: T) {
  const keys = Object.keys(message)
  return keys.reduce((cumm, key) => {
    cumm[decodeKey(key)] = message[key]
    return cumm
  }, {})
}
