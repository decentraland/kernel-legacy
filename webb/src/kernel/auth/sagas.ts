import { getConfiguration, getServerConfigurations } from '@dcl/config'
import auth0 from 'auth0-js'
import jwt from 'jsonwebtoken'
import { all, call, fork, put, select, takeLatest } from 'redux-saga/effects'
import { v4 as uuid } from 'uuid'
import {
  authFailure,
  authSuccess,
  AUTH_FAILURE,
  AUTH_REQUEST,
  LOGIN,
  LoginAction,
  LOGOUT,
  tokenFailure,
  TokenRequestAction,
  tokenSuccess,
  TOKEN_REQUEST
} from './actions'
import { EphemeralKey } from './ephemeral'
import { getAccessToken } from './selectors'
import { AuthData } from './types'

export const webAuth = new auth0.WebAuth({
  clientID: getConfiguration('AUTH0_CLIENT_ID'),
  domain: getConfiguration('AUTH0_DOMAIN'),
  redirectUri: getConfiguration('AUTH0_REDIRECT'),
  responseType: 'token id_token',
  audience: getConfiguration('AUTH0_AUDIENCE'),
  scope: 'openid email'
})

export function* authSaga(): any {
  yield fork(tryRestoreSession)
  yield all([
    takeLatest(LOGIN, handleLogin),
    takeLatest(LOGOUT, handleLogout),
    takeLatest(AUTH_REQUEST, handleAuthRequest),
    takeLatest(AUTH_FAILURE, handleLogin),
    takeLatest(TOKEN_REQUEST, handleTokenRequest)
  ])
}

export function* tryRestoreSession(): any {
  try {
    const result = yield call(async () => await restoreSession())
    yield put(authSuccess(result, undefined))
  } catch (error) {
    yield put(authFailure(error))
  }
}

export function restoreSession(): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    webAuth.checkSession({}, (err, auth) => {
      if (err) {
        return reject(err)
      }
      return resolve({
        email: auth.idTokenPayload.email,
        sub: auth.idTokenPayload.sub,
        expiresAt: auth.expiresIn! * 1000 + new Date().getTime(),
        accessToken: auth.accessToken!,
        idToken: auth.idToken!
      } as AuthData)
    })
  })
}

export function* handleLogin(action: LoginAction): any {
  const redirectUrl = action.payload.redirectUrl
  let options: auth0.AuthorizeOptions = {}
  if (redirectUrl) {
    const nonce = uuid()
    localStorage.setItem(nonce, redirectUrl)
    options.state = nonce
  }
  try {
    webAuth.authorize(options)
  } catch (e) {
    console.log(e)
  }
}

export function* handleLogout(): any {
  webAuth.logout({
    returnTo: window.location.origin
  })
}

export function* handleAuthRequest(): any {
  let data: AuthData
  let redirectUrl: string | null = null
  try {
    const result: CallbackResult = yield call(handleCallback)
    data = result.data
    redirectUrl = result.redirectUrl
  } catch (error) {
    try {
      data = yield call(restoreSession)
    } catch (error) {
      yield put(authFailure(error))
      return
    }
  }
  yield put(authSuccess(data, redirectUrl))
}

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

export function* handleTokenRequest(action: TokenRequestAction): any {
  const accessToken = yield select(getAccessToken)
  const { ephemeral } = action.payload
  try {
    const request = yield call(fetchToken, accessToken, ephemeral)
    yield put(tokenSuccess(request))
  } catch (error) {
    yield put(tokenFailure(error))
  }
}

export async function fetchServerPublicKey() {
  return await (await fetch(getServerConfigurations().auth + '/public_key')).text()
}

export async function fetchToken(userToken: string, ephemeral: EphemeralKey) {
  const publicKey = ephemeral.key.publicKeyAsHexString
    ? ephemeral.key.publicKeyAsHexString()
    : ephemeral.key.publicKey.toString('hex')
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
  if ((decoded as any).ephemeral_key !== publicKey) {
    throw new Error('Returned ephemeral key does not match our public key')
  }
  return token.access_token
}
