import { takeLatest, select, put } from 'redux-saga/effects'
import { parcelSightChanged } from './actions'
import { SET_POSITION } from './actions'
import { deltaSighted } from './selectors'
import { DeltaParcelSightSeeingReport } from './types'

export function* parcelSightSaga(): any {
  yield takeLatest(SET_POSITION, handleNewPosition)
}

export function* handleNewPosition(): any {
  const delta = (yield select(deltaSighted)) as DeltaParcelSightSeeingReport
  if (delta.lostSight.length || delta.sighted.length) {
    yield put(parcelSightChanged(delta))
  }
}
