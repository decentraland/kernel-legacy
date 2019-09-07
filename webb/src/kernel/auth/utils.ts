import auth0 from 'auth0-js'
import uuid from 'uuid'
import jwt from 'jsonwebtoken'

import { AuthData } from './types'
import { getConfiguration, getServerConfigurations } from '@dcl/config'
import { EphemeralKey } from './ephemeral'

export const webAuth = new auth0.WebAuth({
  clientID: getConfiguration('AUTH0_CLIENT_ID'),
  domain: getConfiguration('AUTH0_DOMAIN'),
  redirectUri: getConfiguration('AUTH0_REDIRECT'),
  responseType: 'token id_token',
  audience: getConfiguration('AUTH0_AUDIENCE'),
  scope: 'openid email'
})

export type CallbackResult = { data: AuthData; redirectUrl: string | null }

export function handleCallback(): Promise<CallbackResult> {
  return new Promise((resolve, reject) => {
    webAuth.parseHash((err, auth) => {
      if (err) {
        reject(err)
        return
      }
      if (auth && auth.accessToken && auth.idToken) {
        webAuth.client.userInfo(auth.accessToken, (err, user) => {
          if (err) {
            reject(err)
            return
          }

          let redirectUrl = null
          if (auth.state) {
            redirectUrl = localStorage.getItem(auth.state)
            if (redirectUrl) {
              localStorage.removeItem(auth.state)
            }
          }

          const data: AuthData = {
            email: user.email!,
            sub: user.sub,
            expiresAt: auth.expiresIn! * 1000 + new Date().getTime(),
            accessToken: auth.accessToken!,
            idToken: auth.idToken!
          }
          resolve({ data, redirectUrl })
        })
      } else {
        reject(new Error('No access token found in the url hash'))
      }
    })
  })
}

export function login(redirectUrl?: string) {
  let options: auth0.AuthorizeOptions = {}
  if (redirectUrl) {
    const nonce = uuid.v4()
    localStorage.setItem(nonce, redirectUrl)
    options.state = nonce
  }
  webAuth.authorize(options)
}

export function restoreSession(): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    webAuth.checkSession({}, (err, auth) => {
      if (err) {
        reject(err)
        return
      }
      const result: AuthData = {
        email: auth.idTokenPayload.email,
        sub: auth.idTokenPayload.sub,
        expiresAt: auth.expiresIn! * 1000 + new Date().getTime(),
        accessToken: auth.accessToken!,
        idToken: auth.idToken!
      }
      resolve(result)
    })
  })
}

export function logout(): Promise<void> {
  return new Promise(resolve => {
    webAuth.logout({
      returnTo: window.location.origin
    })
    resolve()
  })
}

export function isTokenExpired(expiresAt: number) {
  return expiresAt > 0 && expiresAt < Date.now()
}

export function createHeaders(idToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`
  }
  return headers
}

export async function fetchServerPublicKey() {
  return await (await fetch(getServerConfigurations().auth + '/public_key')).text()
}

export async function fetchToken(userToken: string, ephemeral: EphemeralKey) {
  const publicKey = ephemeral.key.publicKeyAsHexString()
  const response = await fetch(getServerConfigurations().auth + '/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ user_token: userToken, pub_key: publicKey })
  })
  if (!response.ok) {
    throw new Error('Invalid request to auth/token')
  }
  const token = await response.json()
  if (token.error) {
    throw new Error('Error parsing json response from auth/token')
  }
  const decoded = jwt.decode(token.access_token)
  if (decoded.ephemeral_key !== publicKey) {
    throw new Error('Returned ephemeral key does not match our public key')
  }
  return token.access_token
}
