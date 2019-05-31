import {
  MessageType,
  CoordinatorMessage,
  WelcomeMessage,
  ConnectMessage,
  WebRtcMessage,
  AuthMessage,
  Role
} from './commproto_pb'

import { Message } from 'google-protobuf'
import { SocketReadyState } from './worldInstanceConnection'
import { commConfigurations } from 'config'
import { Stats } from './debug'
import { IBrokerConnection, BrokerMessage } from './IBrokerConnection'
import { ILogger, createLogger } from 'shared/logger'
import { Observable } from '../../decentraland-ecs/src/ecs/Observable'

export class BrokerConnection implements IBrokerConnection {
  public alias: string | null = null
  public authenticated = false

  public commServerAlias: number | null = null
  public webRtcConn: RTCPeerConnection | null = null

  public reliableDataChannel: RTCDataChannel | null = null
  public unreliableDataChannel: RTCDataChannel | null = null

  public stats: Stats | null = null

  public logger: ILogger = createLogger('Broker: ')

  public onMessageObservable = new Observable<BrokerMessage>()

  get hasUnreliable() {
    return (this.unreliableDataChannel && this.unreliableDataChannel.readyState === 'open') || false
  }

  get hasReliable() {
    return (this.reliableDataChannel && this.reliableDataChannel.readyState === 'open') || false
  }

  private ws: WebSocket | null = null

  constructor(public url: string) {
    this.connectRTC()
    this.connectWS()
    // TODO: reconnect logic, handle disconnections
  }

  logDebug(): void {
    if (this.ws && this.ws.readyState === SocketReadyState.OPEN) {
      const state = (this.authenticated ? 'authenticated' : 'not authenticated') + `my alias is ${this.alias}`
      this.logger.log(state)
    } else {
      this.logger.log(`non active coordinator connection to ${this.url}`)
    }
  }

  sendReliable(data: Uint8Array) {
    if (!this.hasReliable) {
      throw new Error('trying to message using null reliable channel')
    }
    this.reliableDataChannel!.send(data)
  }

  sendUnreliable(data: Uint8Array) {
    if (!this.hasUnreliable) {
      throw new Error('trying to message using null unreliable channel')
    }
    this.unreliableDataChannel!.send(data)
  }

  close() {
    if (this.webRtcConn) {
      this.webRtcConn.onsignalingstatechange = null
      this.webRtcConn.oniceconnectionstatechange = null
      this.webRtcConn.onicecandidate = null
      this.webRtcConn.ondatachannel = null
      this.webRtcConn.close()
      this.webRtcConn = null
    }

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
      case MessageType.UNKNOWN_MESSAGE_TYPE: {
        if (this.stats) {
          this.stats.others.incrementRecv(msgSize)
        }
        this.logger.log('unsopported message')
        break
      }
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

        const alias = `${message.getAlias()}`
        const availableServers = message.getAvailableServersList()

        if (availableServers.length === 0) {
          throw new Error('no available servers')
        }

        const serverAlias = availableServers[0]
        this.commServerAlias = serverAlias
        this.alias = alias
        this.logger.info('my alias is', alias)

        const connectMessage = new ConnectMessage()
        connectMessage.setType(MessageType.CONNECT)
        connectMessage.setToAlias(serverAlias)
        this.sendCoordinatorMessage(connectMessage)
        break
      }
      case MessageType.WEBRTC_ICE_CANDIDATE:
      case MessageType.WEBRTC_OFFER:
      case MessageType.WEBRTC_ANSWER: {
        if (this.stats) {
          this.stats.webRtcSession.incrementRecv(msgSize)
        }

        let message: WebRtcMessage
        try {
          message = WebRtcMessage.deserializeBinary(msg)
        } catch (e) {
          this.logger.error('cannot deserialize webrtc ice candidate message', e, msg)
          break
        }

        const sdp = message.getSdp()

        if (message.getFromAlias() !== this.commServerAlias) {
          this.logger.log('ignore webrtc message from unknown peer', message.getFromAlias())
          break
        }

        if (msgType === MessageType.WEBRTC_ICE_CANDIDATE) {
          try {
            await this.webRtcConn!.addIceCandidate({ candidate: sdp })
          } catch (err) {
            this.logger.error(err)
          }
        } else if (msgType === MessageType.WEBRTC_OFFER) {
          try {
            this.logger.log('1')
            await this.webRtcConn!.setRemoteDescription(new RTCSessionDescription({ type: 'offer', sdp: sdp }))
            this.logger.log('2')
            const desc = await this.webRtcConn!.createAnswer()
            this.logger.log('3')
            await this.webRtcConn!.setLocalDescription(desc)
            this.logger.log('4', desc)

            if (desc.sdp) {
              const msg = new WebRtcMessage()
              msg.setToAlias(this.commServerAlias)
              msg.setType(MessageType.WEBRTC_ANSWER)
              msg.setSdp(desc.sdp)
              this.sendCoordinatorMessage(msg)
            }
          } catch (err) {
            this.logger.error(err)
          }
        } else if (msgType === MessageType.WEBRTC_ANSWER) {
          try {
            await this.webRtcConn!.setRemoteDescription(new RTCSessionDescription({ type: 'answer', sdp: sdp }))
          } catch (err) {
            this.logger.error(err)
          }
        }
        break
      }
      default: {
        if (this.stats) {
          this.stats.others.incrementRecv(msgSize)
        }
        this.logger.log('ignoring message with type', msgType)
        break
      }
    }
  }

  private sendCoordinatorMessage = (msg: Message) => {
    if (!this.ws || this.ws.readyState !== SocketReadyState.OPEN) {
      throw new Error('try to send answer to a non ready ws')
    }

    const bytes = msg.serializeBinary()

    if (this.stats) {
      this.stats.webRtcSession.incrementSent(1, bytes.length)
    }

    this.ws.send(bytes)
  }

  private connectRTC() {
    this.webRtcConn = new RTCPeerConnection({
      iceServers: commConfigurations.iceServers
    })

    this.webRtcConn.onsignalingstatechange = (e: Event) => {
      this.logger.log(`signaling state: ${this.webRtcConn!.signalingState}`)
    }

    this.webRtcConn.oniceconnectionstatechange = (e: Event) => {
      this.logger.log(`ice connection state: ${this.webRtcConn!.iceConnectionState}`)
    }

    this.webRtcConn.onicecandidate = this.onIceCandidate
    this.webRtcConn.ondatachannel = this.onDataChannel
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

  private onIceCandidate = (event: RTCPeerConnectionIceEvent) => {
    if (event.candidate !== null) {
      const msg = new WebRtcMessage()
      msg.setType(MessageType.WEBRTC_ICE_CANDIDATE)
      // TODO: Ensure commServerAlias, it may be null
      msg.setToAlias(this.commServerAlias!)
      msg.setSdp(event.candidate.candidate)
      // TODO: add sdp fields
      this.sendCoordinatorMessage(msg)
    }
  }

  private onDataChannel = (e: RTCDataChannelEvent) => {
    let dc = e.channel

    dc.onclose = () => {
      this.logger.log(`DataChannel ${JSON.stringify(dc.label)} has closed`)
    }

    dc.onopen = () => {
      const label = dc.label
      this.logger.log(`DataChannel ${JSON.stringify(dc.label)} has opened`)

      if (label === 'reliable') {
        this.reliableDataChannel = dc
        const authMessage = new AuthMessage()
        authMessage.setType(MessageType.AUTH)
        authMessage.setRole(Role.CLIENT)
        authMessage.setMethod('noop')
        const bytes = authMessage.serializeBinary()

        if (dc.readyState === 'open') {
          dc.send(bytes)
          this.authenticated = true
        } else {
          this.logger.error('cannot send authentication, data channel is not ready')
        }
      } else if (label === 'unreliable') {
        this.unreliableDataChannel = dc
      }
    }

    dc.onmessage = (e: MessageEvent) => {
      if (this.stats) {
        this.stats.dispatchTopicDuration.start()
      }

      const data = e.data
      const msg = new Uint8Array(data)

      this.onMessageObservable.notifyObservers({ data: msg, channel: dc.label })
    }
  }
}
