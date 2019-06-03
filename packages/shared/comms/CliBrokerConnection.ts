import { MessageType, CoordinatorMessage, WelcomeMessage, ConnectMessage } from './proto/broker'
import { SocketReadyState } from './worldInstanceConnection'
import { Stats } from './debug'
import { IBrokerConnection, BrokerMessage } from './IBrokerConnection'
import { ILogger, createLogger } from 'shared/logger'
import { Observable } from '../../decentraland-ecs/src/ecs/Observable'

export class CliBrokerConnection implements IBrokerConnection {
  public alias: number | null = null

  public stats: Stats | null = null

  public logger: ILogger = createLogger('Broker: ')

  public onMessageObservable = new Observable<BrokerMessage>()

  get hasUnreliable() {
    return (this.ws && this.ws.readyState === WebSocket.OPEN) || false
  }

  get hasReliable() {
    return (this.ws && this.ws.readyState === WebSocket.OPEN) || false
  }

  private ws: WebSocket | null = null

  constructor(public url: string) {
    this.connectWS()
  }

  logDebug(): void {
    if (this.ws && this.ws.readyState === SocketReadyState.OPEN) {
      const state = (this.alias ? 'authenticated' : 'not authenticated') + `my alias is ${this.alias}`
      this.logger.log(state)
    } else {
      this.logger.log(`non active coordinator connection to ${this.url}`)
    }
  }

  sendReliable(data: Uint8Array) {
    if (!this.hasReliable) {
      throw new Error('trying to message using null reliable channel')
    }
    this.sendCoordinatorMessage(data)
  }

  sendUnreliable(data: Uint8Array) {
    if (!this.hasUnreliable) {
      throw new Error('trying to message using null unreliable channel')
    }
    this.sendCoordinatorMessage(data)
  }

  close() {
    if (this.ws) {
      this.ws.onmessage = null
      this.ws.onerror = null
      this.ws.onclose = null
      this.ws.close()
    }
  }

  async onWsMessage(event: MessageEvent) {
    const data = event.data
    const msg = new Uint8Array(data)
    const msgSize = msg.length

    const msgType = CoordinatorMessage.deserializeBinary(data).getType()

    switch (msgType) {
      case MessageType.WELCOME: {
        if (this.stats) {
          this.stats.others.incrementRecv(msgSize)
        }

        let message: WelcomeMessage
        try {
          message = WelcomeMessage.deserializeBinary(msg)
        } catch (e) {
          this.logger.error('cannot deserialize welcome client message', e, msg)
          break
        }

        this.alias = message.getAlias()
        this.logger.info('my alias is', this.alias)

        const connectMessage = new ConnectMessage()
        connectMessage.setType(MessageType.CONNECT)
        connectMessage.setToAlias(0)
        connectMessage.setFromAlias(this.alias)
        this.sendCoordinatorMessage(connectMessage.serializeBinary())

        break
      }
      case MessageType.DATA:
      case MessageType.PING: {
        if (this.stats) {
          this.stats.dispatchTopicDuration.start()
        }

        this.onMessageObservable.notifyObservers({
          channel: 'ws',
          data: msg
        })

        break
      }
      default: {
        if (this.stats) {
          this.stats.others.incrementRecv(msgSize)
        }
        this.logger.warn('Ignoring message type', msgType)
        break
      }
    }
  }

  private sendCoordinatorMessage = (msg: Uint8Array) => {
    if (!this.ws || this.ws.readyState !== SocketReadyState.OPEN) {
      throw new Error('try to send answer to a non ready ws')
    }

    this.ws.send(msg)
  }

  private connectWS() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }

    this.ws = new WebSocket(this.url)
    this.ws.binaryType = 'arraybuffer'

    this.ws.onerror = event => {
      this.logger.error('socket error', event)
      this.ws = null
    }

    this.ws.onmessage = event => {
      this.onWsMessage(event).catch(err => {
        this.logger.error(err)
      })
    }
  }
}