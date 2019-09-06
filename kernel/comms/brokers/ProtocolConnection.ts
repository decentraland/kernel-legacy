import { Message } from 'google-protobuf'
import { EventEmitter } from 'events'

import { createLogger, ILogger } from '@dcl/utils'

import {
  Category,
  ChatData,
  MessageHeader,
  MessageType,
  PingMessage,
  PositionData,
  ProfileData,
  TopicFWMessage,
  TopicIdentityFWMessage
} from '@dcl/protos'

import { SendResult } from '../types/SendResult'
import { IBrokerConnection, BrokerMessage } from './IBrokerConnection'

export class ProtocolConnection extends EventEmitter {
  logger: ILogger
  // TODO(@eordano, 26/Aug/2019): add stats reporting back

  constructor(public connection: IBrokerConnection) {
    super()
    this.logger = createLogger('ProtocolConnection')
    this.connection.onMessageObservable.add(this.handleMessage.bind(this))
  }

  sendMessage(reliable: boolean, topicMessage: Message) {
    return reliable ? this.sendReliableMessage(topicMessage) : this.sendUnreliableMessage(topicMessage)
  }

  close() {
    this.connection.close()
  }

  private sendReliableMessage(msg: Message) {
    if (!this.connection.hasReliableChannel) {
      this.logger.error('trying to send a topic message using null reliable channel')
      return
    }
    const bytes = msg.serializeBinary()
    this.connection.sendReliable(bytes)
    return new SendResult(bytes.length)
  }

  private sendUnreliableMessage(msg: Message) {
    if (!this.connection.hasUnreliableChannel) {
      this.logger.error('trying to send a topic message using null unreliable channel')
      return
    }
    const bytes = msg.serializeBinary()
    this.connection.sendUnreliable(bytes)
    return new SendResult(bytes.length)
  }

  private handleMessage(message: BrokerMessage) {
    try {
      const msgType = MessageHeader.deserializeBinary(message.data).getType()
      let dataMessage, body, dataHeader, category
      switch (msgType) {
        case MessageType.UNKNOWN_MESSAGE_TYPE:
          this.logger.warn(`Unsupported message type: ${msgType}`)
          return
        case MessageType.TOPIC_FW:
          dataMessage = TopicFWMessage.deserializeBinary(message.data)
          body = dataMessage.getBody() as any
          dataHeader = TopicFWMessage.deserializeBinary(body)
          category = dataHeader.getCategory()
          switch (category) {
            case Category.POSITION:
              let positionData = PositionData.deserializeBinary(body)
              this.emit('' + Category.POSITION, positionData)
              break
            case Category.CHAT:
            case Category.SCENE_MESSAGE:
              let chatData = ChatData.deserializeBinary(body)
              this.emit('' + category, chatData)
              break
            default:
              this.emit('' + category, body)
              break
          }
          break
        case MessageType.TOPIC_IDENTITY_FW:
          dataMessage = TopicIdentityFWMessage.deserializeBinary(message.data)
          body = dataMessage.getBody() as any
          dataHeader = TopicIdentityFWMessage.deserializeBinary(body)
          category = dataHeader.getCategory()
          const alias = dataMessage.getFromAlias().toString()
          const userId = atob(dataMessage.getIdentity_asB64())
          category = dataHeader.getCategory()
          switch (category) {
            case Category.PROFILE:
              const profileData = ProfileData.deserializeBinary(body)
              this.emit('' + Category.PROFILE, { ...profileData, alias, userId })
              break
          }
          break
        case MessageType.PING:
          const pingMessage = PingMessage.deserializeBinary(message.data)
          this.emit('' + MessageType.PING, pingMessage)
          break
      }
    } catch (e) {
      this.logger.error('Protocol error:', e.message, e.stack)
      return
    }
  }
}
