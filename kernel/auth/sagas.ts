import { fork, call, all, takeLatest, put, select } from 'redux-saga/effects'

import { AUTH_REQUEST, LOGIN, LOGOUT, authRequest, authSuccess, authFailure, LoginAction } from './actions'
import { login, logout, handleCallback, restoreSession, CallbackResult } from './utils'
import { isExpired } from './selectors'
import { AuthData } from './types'

export function* authSaga() {
  yield fork(handleRestoreSession)
  yield all([
    takeLatest(LOGIN, handleLogin),
    takeLatest(LOGOUT, handleLogout),
    takeLatest(AUTH_REQUEST, handleAuthRequest)
  ])
}

export function* handleLogin(action: LoginAction) {
  yield call(login, action.payload.redirectUrl)
}

function* handleLogout() {
  yield call(logout)
}

export function* handleRestoreSession() {
  yield put(authRequest())
}

export function* checkExpiredSession() {
  const hasExpired = yield select(isExpired)
  if (hasExpired) {
    yield put(authRequest())
  }
}

export function* handleAuthRequest() {
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
