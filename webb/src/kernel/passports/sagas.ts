import { memoize } from '@dcl/utils'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { getAccessToken } from '../auth/selectors'
import { PassportRequestAction, passportSuccess, PASSPORT_REQUEST, passportFailure } from './actions'
import { getProfileDownloadServer } from './selectors'

export function* profileResolverSaga(): any {
  yield takeLatest(PASSPORT_REQUEST, fetchProfile)
}

export function* fetchProfile(action: PassportRequestAction): any {
  const userId = action.payload.userId
  try {
    const serverUrl = yield select(getProfileDownloadServer)
    const accessToken = yield select(getAccessToken)
    const profile = yield call(httpProfileRequest, serverUrl, accessToken, userId)
    yield put(passportSuccess(userId, profile.data))
  } catch (error) {
    yield put(passportFailure(userId, error))
  }
}

export async function httpProfileRequest(serverUrl: string, accessToken: string, userId: string) {
  return memoize(`${serverUrl}api/profile/${userId}`)(fetch, {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
}
