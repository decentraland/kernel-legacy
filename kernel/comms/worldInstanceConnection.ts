import { Message } from 'google-protobuf'
import { EventEmitter } from 'events'

import { createLogger, ILogger } from '@dcl/utils'

import {
  Category,
  ChatData,
  DataHeader,
  MessageHeader,
  MessageType,
  PingMessage,
  PositionData,
  ProfileData,
  TopicFWMessage,
  TopicIdentityFWMessage
} from '@dcl/protos'

import { SendResult } from './types/SendResult'
import { IBrokerConnection, BrokerMessage } from './brokers/IBrokerConnection'

export class WorldInstanceConnection extends EventEmitter {
  logger: ILogger
  // TODO(@eordano, 26/Aug/2019): add stats reporting back

  constructor(public connection: IBrokerConnection) {
    super()
    this.logger = createLogger('CommsMultiplexer')
    this.connection.onMessageObservable.add(this.handleMessage.bind(this))
  }

  sendMessage(reliable: boolean, topicMessage: Message) {
    return reliable ? this.sendReliableMessage(topicMessage) : this.sendUnreliableMessage(topicMessage)
  }

  close() {
    this.connection.close()
  }

  private sendReliableMessage(msg: Message) {
    if (!this.connection.hasReliableChannel)
      throw new Error('trying to send a topic message using null reliable channel')
    const bytes = msg.serializeBinary()
    this.connection.sendReliable(bytes)
    return new SendResult(bytes.length)
  }

  private sendUnreliableMessage(msg: Message) {
    if (!this.connection.hasUnreliableChannel)
      throw new Error('trying to send a topic message using null unreliable channel')
    const bytes = msg.serializeBinary()
    this.connection.sendUnreliable(bytes)
    return new SendResult(bytes.length)
  }

  private handleMessage(message: BrokerMessage) {
    // TODO(@eordano, 26/Aug/2019): refactor this so it fits one single screen
    const msgSize = message.data.length

    let msgType: number = MessageType.UNKNOWN_MESSAGE_TYPE
    try {
      msgType = MessageHeader.deserializeBinary(message.data).getType()
    } catch (err) {
      this.logger.error('cannot deserialize worldcomm message header ' + message.channel + ' ' + msgSize)
      return
    }

    switch (msgType) {
      case MessageType.UNKNOWN_MESSAGE_TYPE: {
        this.logger.log('unsupported message')
        break
      }
      case MessageType.TOPIC_FW: {
        let dataMessage: TopicFWMessage
        try {
          dataMessage = TopicFWMessage.deserializeBinary(message.data)
        } catch (e) {
          this.logger.error('cannot process topic message', e)
          break
        }

        const body = dataMessage.getBody() as any

        let dataHeader: DataHeader
        try {
          dataHeader = DataHeader.deserializeBinary(body)
        } catch (e) {
          this.logger.error('cannot process data header', e)
          break
        }

        const category = dataHeader.getCategory()
        switch (category) {
          case Category.POSITION: {
            const positionData = PositionData.deserializeBinary(body)
            this.emit('' + Category.POSITION, positionData)
            break
          }
          case Category.CHAT: {
            const chatData = ChatData.deserializeBinary(body)
            this.emit('' + Category.CHAT, chatData)
            break
          }
          case Category.SCENE_MESSAGE: {
            const chatData = ChatData.deserializeBinary(body)
            this.emit('' + Category.SCENE_MESSAGE, chatData)
            break
          }
          default: {
            this.emit('' + category, body)
            break
          }
        }
        break
      }
      case MessageType.TOPIC_IDENTITY_FW: {
        let dataMessage: TopicIdentityFWMessage
        try {
          dataMessage = TopicIdentityFWMessage.deserializeBinary(message.data)
        } catch (e) {
          this.logger.error('cannot process topic identity message', e)
          break
        }

        const body = dataMessage.getBody() as any

        let dataHeader: DataHeader
        try {
          dataHeader = DataHeader.deserializeBinary(body)
        } catch (e) {
          this.logger.error('cannot process data header', e)
          break
        }

        const alias = dataMessage.getFromAlias().toString()
        const userId = atob(dataMessage.getIdentity_asB64())
        const category = dataHeader.getCategory()
        switch (category) {
          case Category.PROFILE: {
            const profileData = ProfileData.deserializeBinary(body)
            this.emit('' + Category.PROFILE, { ...profileData, alias, userId })
            break
          }
          default: {
            this.logger.log('ignoring category', category)
            break
          }
        }
        break
      }
      case MessageType.PING: {
        let pingMessage
        try {
          pingMessage = PingMessage.deserializeBinary(message.data)
          this.emit('' + MessageType.PING, pingMessage)
        } catch (e) {
          this.logger.error('cannot deserialize ping message', e, message)
          break
        }
        break
      }
      default: {
        this.logger.log('ignoring message with type', msgType)
        break
      }
    }
  }
}
