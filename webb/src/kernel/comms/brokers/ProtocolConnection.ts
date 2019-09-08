import { Message } from 'google-protobuf'
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
import { protocolPosition, protocolChat, protocolProfile, protocolPing, protocolUnknown } from '../actions'
import { store } from '../../store'

export class ProtocolConnection {
  logger: ILogger

  constructor(public connection: IBrokerConnection, public dispatcher: (action: any) => void) {
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
          store.dispatch(protocolUnknown(msgType))
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
              store.dispatch(protocolPosition(positionData))
              break
            case Category.CHAT:
            case Category.SCENE_MESSAGE:
              let chatData = ChatData.deserializeBinary(body)
              store.dispatch(protocolChat(chatData))
              break
            default:
              store.dispatch(protocolUnknown(body))
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
              store.dispatch(protocolProfile(alias, userId, profileData))
              break
          }
          break
        case MessageType.PING:
          const pingMessage = PingMessage.deserializeBinary(message.data)
          store.dispatch(protocolPing(pingMessage))
          break
      }
    } catch (e) {
      this.logger.error('Protocol error:', e.message, e.stack)
      return
    }
  }
}
