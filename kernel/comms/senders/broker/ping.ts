import { PingMessage, MessageType } from '@dcl/protos'
import { IBrokerConnection } from '../../brokers/IBrokerConnection'

/**
 * Returns true if the ping was sent successfully, false otherwise
 *
 * @param connection
 */
export function sendPing(connection: IBrokerConnection): boolean {
  const msg = new PingMessage()
  msg.setType(MessageType.PING)
  msg.setTime(Date.now())
  const bytes = msg.serializeBinary()

  if (connection.hasUnreliableChannel) {
    connection.sendUnreliable(bytes)
    return true
  }
  return false
}
