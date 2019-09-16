import { takeLatest, select, put } from 'redux-saga/effects'
import { parcelSightChanged } from './actions'
import { SET_POSITION } from './actions'
import { deltaSighted } from './selectors'

export function* parcelSightSaga() {
  yield takeLatest(SET_POSITION, handleNewPosition)
}

export function* handleNewPosition() {
  yield put(parcelSightChanged(yield select(deltaSighted)))
}
