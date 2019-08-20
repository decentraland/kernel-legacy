import { USE_LOCAL_COMMS, getServerConfigurations } from 'dcl/config'
import { defaultLogger } from 'dcl/utils'

import { WorldInstanceConnection } from './worldInstanceConnection'

import { BrokerConnection } from './BrokerConnection'
import { CliBrokerConnection } from './CliBrokerConnection'
import { IBrokerConnection } from './IBrokerConnection'
import { Auth } from '../auth/Auth'

export async function connect(auth: Auth) {
  let commsBroker: IBrokerConnection

  if (USE_LOCAL_COMMS) {
    const commsUrl = document.location.toString().replace(/^http/, 'ws')
    defaultLogger.log('Using WebSocket comms: ' + commsUrl)
    commsBroker = new CliBrokerConnection(commsUrl)
  } else {
    const coordinatorURL = getServerConfigurations().worldInstanceUrl
    const body = `GET:${coordinatorURL}`
    const credentials = await auth.getMessageCredentials(body)

    const qs = new URLSearchParams({
      signature: credentials['x-signature'],
      identity: credentials['x-identity'],
      timestamp: credentials['x-timestamp'],
      'access-token': credentials['x-access-token']
    })

    const url = new URL(coordinatorURL)

    url.search = qs.toString()

    commsBroker = new BrokerConnection(url.toString(), auth)
  }

  return new WorldInstanceConnection(commsBroker)
}
