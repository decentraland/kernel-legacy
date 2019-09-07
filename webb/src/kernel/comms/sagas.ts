import { getServerConfigurations, USE_LOCAL_COMMS } from '@dcl/config'
import { defaultLogger } from '@dcl/utils'
import { put, call, takeLatest, take } from 'redux-saga/effects'
import { Auth } from '../auth'
import { tokenRequest, TOKEN_SUCCESS, tokenSuccess, TokenSuccessAction } from '../auth/actions'
import { MessageInput } from '../auth/ephemeral'
import { store } from '../store'
import { COMMS_STARTED } from './actions'
import { BrokerConnection } from './brokers/BrokerConnection'
import { CliBrokerConnection } from './brokers/CliBrokerConnection'
import { IBrokerConnection } from './brokers/IBrokerConnection'
import { ProtocolConnection } from './brokers/ProtocolConnection'

export function* commsSaga() {
  yield takeLatest(COMMS_STARTED, handleCommsStart)
}

export var connection

export function* handleCommsStart() {
  let commsBroker: IBrokerConnection

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
      const credentials = await ephemeral.makeMessageCredentials(
        input,
        accessToken
      )
      debugger

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
