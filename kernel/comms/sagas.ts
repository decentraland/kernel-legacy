import { getServerConfigurations, USE_LOCAL_COMMS } from '@dcl/config'
import { defaultLogger } from '@dcl/utils'
import { call, put, select, take, takeLatest } from 'redux-saga/effects'
import { Auth } from '../auth'
import { tokenRequest, TokenSuccessAction, TOKEN_SUCCESS } from '../auth/actions'
import { MessageInput } from '../auth/ephemeral'
import { getMyCurrentProfileVersion } from '../passports/selectors'
import { marshalPositionReport } from '../presence/marshalPositionReport'
import { getTopicForPosition } from '../presence/mine/getTopicForPosition'
import { store } from '../store'
import { getCurrentPosition } from '../userLocation/ParcelSight/selectors'
import {
  COMMS_STARTED,
  ProtocolOutPositionAction,
  ProtocolOutPrivateMessageAction,
  ProtocolOutSceneAction,
  ProtocolOutYellAction,
  PROTOCOL_OUT_CHAT,
  PROTOCOL_OUT_PING,
  PROTOCOL_OUT_POSITION,
  PROTOCOL_OUT_PRIVATE_MESSAGE,
  PROTOCOL_OUT_PROFILE,
  PROTOCOL_OUT_SCENE,
  PROTOCOL_OUT_YELL
} from './actions'
import { BrokerConnection } from './brokers/BrokerConnection'
import { CliBrokerConnection } from './brokers/CliBrokerConnection'
import { IBrokerConnection } from './brokers/IBrokerConnection'
import { ProtocolConnection } from './brokers/ProtocolConnection'
import { sendPing } from './senders/broker/ping'
import { sendChatMessage } from './senders/chat'
import { sendPosition } from './senders/position'
import { sendProfileMessage } from './senders/profile'

export var connection
export var commsBroker: IBrokerConnection

export function* commsSaga() {
  yield takeLatest(COMMS_STARTED, handleCommsStart)
  yield takeLatest(PROTOCOL_OUT_POSITION, handleSendPositionRequest)
  yield takeLatest(PROTOCOL_OUT_PROFILE, handleSendProfileRequest)
  yield takeLatest(PROTOCOL_OUT_PING, handleSendPingRequest)
  yield takeLatest(PROTOCOL_OUT_YELL, handleYellRequest)
  yield takeLatest(PROTOCOL_OUT_PRIVATE_MESSAGE, handlePrivateMessageRequest)
  yield takeLatest(PROTOCOL_OUT_CHAT, handleSendChatRequest)
  yield takeLatest(PROTOCOL_OUT_SCENE, handleSendSceneRequest)
}

export function* handleSendPositionRequest(action: ProtocolOutPositionAction) {
  const position = yield select(getCurrentPosition)
  const topic = getTopicForPosition(position)
  sendPosition(connection, topic, marshalPositionReport(action.payload))
}

export function* handleSendProfileRequest() {
  const position = yield select(getCurrentPosition)
  const myProfileVersion = yield select(getMyCurrentProfileVersion)
  sendProfileMessage(connection, position, myProfileVersion)
}

export function* handleSendPingRequest() {
  sendPing(connection)
}

var currentMessageId = 0
export function* handlePrivateMessageRequest(action: ProtocolOutPrivateMessageAction) {
  sendChatMessage(connection, action.payload.to, '' + ++currentMessageId, action.payload.message)
}
export function* handleYellRequest(action: ProtocolOutYellAction) {
  const position = yield select(getCurrentPosition)
  sendChatMessage(connection, 'r-' + position, '' + ++currentMessageId, action.payload.message)
}
/**
 * @deprecated
 */
export function* handleSendChatRequest() {
  console.log('sendChatMessage is deprecated -- please use Yell or PrivateMessage')
}
export function* handleSendSceneRequest(action: ProtocolOutSceneAction) {
  sendChatMessage(connection, action.payload.sceneId, '' + ++currentMessageId, action.payload.message)
}

export function* handleCommsStart() {
  if (USE_LOCAL_COMMS) {
    const commsUrl = document.location.toString().replace(/^http/, 'ws')
    defaultLogger.log('Using WebSocket comms: ' + commsUrl)
    commsBroker = new CliBrokerConnection(commsUrl)
  } else {
    const coordinatorURL = getServerConfigurations().worldInstanceUrl
    const body = `GET:${coordinatorURL}`
    const auth = new Auth()
    auth.store = store
    yield put(tokenRequest(auth.getEphemeralKey()))
    const tokenSuccessAction = (yield take(TOKEN_SUCCESS)) as TokenSuccessAction
    const accessToken = tokenSuccessAction.payload.commsToken
    const ephemeral = auth.getEphemeralKey()

    const msg = Buffer.from(body)
    const input = MessageInput.fromMessage(msg)
    yield call(async () => {
      const credentials = await ephemeral.makeMessageCredentials(input, accessToken)

      const qs = new URLSearchParams({
        signature: credentials.get('x-signature'),
        identity: credentials.get('x-identity'),
        timestamp: credentials.get('x-timestamp'),
        'access-token': credentials.get('x-access-token')
      })

      const url = new URL(coordinatorURL)

      url.search = qs.toString()

      commsBroker = new BrokerConnection(url.toString(), auth)
      return new ProtocolConnection(commsBroker, action => {})
    })
  }
}
