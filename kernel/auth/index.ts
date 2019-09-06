import future from 'fp-future'
import { createStore, Store, combineReducers } from 'redux'

import { getConfiguration } from '@dcl/config'

import { BasicEphemeralKey, EphemeralKey, MessageInput } from './ephemeral'
import { authReducer } from './reducer'
import { getAccessToken, isLoggedIn, RootAuthState, getCommsToken } from './selectors'
import { tokenRequest } from './actions'

export class Auth {
  store: Store<RootAuthState>
  ephemeralKey: EphemeralKey
  setup() {
    this.store = createStore(combineReducers({ auth: authReducer }))
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

  getCommsToken() {
    const token = getCommsToken(this.store.getState())
    if (token) {
      return Promise.resolve(token)
    }
    const result = future<string>()
    const unsubscribe = this.store.subscribe(() => {
      const state = this.store.getState()
      if (getCommsToken(state)) {
        result.resolve(getCommsToken(state))
        unsubscribe()
      }
    })
    this.store.dispatch(tokenRequest(this.getEphemeralKey()))
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
    const accessToken = await this.getCommsToken()
    const credentials = await this.getEphemeralKey().makeMessageCredentials(input, accessToken)

    let result: Record<string, string> = {}

    for (const [key, value] of credentials.entries()) {
      result[key] = value
    }

    return result
  }
}
