import { fork, call, all, takeLatest, put, select } from 'redux-saga/effects'

import {
  AUTH_REQUEST,
  LOGIN,
  LOGOUT,
  authRequest,
  authSuccess,
  authFailure,
  LoginAction,
  AUTH_FAILURE,
  TOKEN_REQUEST,
  TokenRequestAction,
  tokenFailure,
  tokenSuccess
} from './actions'
import { login, logout, handleCallback, restoreSession, CallbackResult, fetchToken } from './utils'
import { isExpired, getAccessToken } from './selectors'
import { AuthData } from './types'

export function* authSaga(): any {
  yield fork(handleRestoreSession)
  yield all([
    takeLatest(LOGIN, handleLogin),
    takeLatest(LOGOUT, handleLogout),
    takeLatest(AUTH_REQUEST, handleAuthRequest),
    takeLatest(TOKEN_REQUEST, handleTokenRequest),
    takeLatest(AUTH_FAILURE, triggerLogin)
  ])
}

export function* handleLogin(action: LoginAction): any {
  yield call(login, action.payload.redirectUrl)
}

function* handleLogout(): any {
  yield call(logout)
}

export function* handleRestoreSession(): any {
  yield put(authRequest())
}

export function* handleTokenRequest(action: TokenRequestAction): any {
  const accessToken = yield select(getAccessToken)
  const { ephemeral } = action.payload
  try {
    const request = yield call(fetchToken, accessToken, ephemeral)
    yield put(tokenSuccess(request))
  } catch (error) {
    yield put(tokenFailure(error.message))
  }
}

export function* checkExpiredSession(): any {
  const hasExpired = yield select(isExpired)
  if (hasExpired) {
    yield put(authRequest())
  }
}

export function* triggerLogin(): any {
  yield put(authRequest())
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
      yield put(authFailure(error.message))
      return
    }
  }
  yield put(authSuccess(data, redirectUrl))
}
