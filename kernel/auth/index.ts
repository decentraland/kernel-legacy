import future from 'fp-future'
import { createStore, Store } from 'redux'

import { getConfiguration } from '@dcl/config'

import { BasicEphemeralKey, EphemeralKey, MessageInput } from './ephemeral'
import { authReducer } from './reducer'
import { getAccessToken, isLoggedIn } from './selectors'
import { AuthState } from './types'

export class Auth {
  store: Store<AuthState>
  ephemeralKey: EphemeralKey
  setup() {
    this.store = createStore(authReducer)
  }

  getAccessToken() {
    if (isLoggedIn(this.store.getState())) {
      return Promise.resolve(getAccessToken(this.store.getState()))
    }
    const result = future<string>()
    const unsubscribe = this.store.subscribe(() => {
      const state = this.store.getState()
      if (isLoggedIn(state)) {
        result.resolve(getAccessToken(state))
        unsubscribe()
      }
    })
    return result
  }

  isLoggedIn() {
    return isLoggedIn(this.store.getState())
  }

  getEphemeralKey() {
    if (!this.ephemeralKey || this.ephemeralKey.hasExpired()) {
      this.ephemeralKey = BasicEphemeralKey.generateNewKey(getConfiguration('EPHEMERAL_KEY_TTL'))
    }
    return this.ephemeralKey
  }

  async getMessageCredentials(message: string | null) {
    const msg = message === null ? null : Buffer.from(message)
    const input = MessageInput.fromMessage(msg)
    const accessToken = await this.getAccessToken()

    const credentials = await this.getEphemeralKey().makeMessageCredentials(input, accessToken)

    let result: Record<string, string> = {}

    for (const [key, value] of credentials.entries()) {
      result[key] = value
    }

    return result
  }
}
