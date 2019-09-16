import { getConfiguration } from '@dcl/config'
import future from 'fp-future'
import { Store } from 'redux'
import { tokenRequest } from './actions'
import { BasicEphemeralKey, EphemeralKey, MessageInput } from './ephemeral'
import { getAccessToken, getCommsToken, getEphemeralKey, isLoggedIn, isTokenExpired } from './selectors'
import { RootAuthState } from './types'

export class Auth {
  store: Store<RootAuthState>
  ephemeralKey: EphemeralKey

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
    try {
      this.store.dispatch(tokenRequest(this.getEphemeralKey()))
    } catch (e) {
      console.log(e)
    }
    return result
  }

  isLoggedIn() {
    return isLoggedIn(this.store.getState())
  }

  getEphemeralKey() {
    let ephemeralKey = getEphemeralKey(this.store.getState())
    if (!ephemeralKey || ((ephemeralKey as BasicEphemeralKey).expirationDate && isTokenExpired((ephemeralKey as BasicEphemeralKey).expirationDate))) {
      ephemeralKey = BasicEphemeralKey.generateNewKey(getConfiguration('EPHEMERAL_KEY_TTL'))
    }
    return ephemeralKey
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
