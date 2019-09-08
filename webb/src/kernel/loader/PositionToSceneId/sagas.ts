import { defaultLogger, getKeysMappingToTrue, memoize } from '@dcl/utils'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'
import { SET_POSITION } from '../../userLocation/ParcelSight/actions'
import { allInSight } from '../../userLocation/ParcelSight/selectors'
import {
  FORGET_POSITION,
  PositionLoadRequest,
  positionLoadRequest,
  POSITION_LOADING_REQUEST,
  setPositionsAsEmpty,
  setPositionsAsError,
  setPositionsAsResolved
} from './actions'
import { getDownloadServer, multipleNeedsResolution } from './selectors'

export function* positionToSceneIdSaga(): any {
  yield takeLatest(FORGET_POSITION, fetchMissingSceneIdMappings)
  yield takeLatest(SET_POSITION, fetchMissingSceneIdMappings)
  yield takeLatest(POSITION_LOADING_REQUEST, handleLoadPositionMapping)
}

export function* fetchMissingSceneIdMappings(): any {
  const delta = yield select(allInSight)
  const needsResolution = yield select(multipleNeedsResolution, delta)
  const missingParcels = getKeysMappingToTrue(needsResolution)
  yield put(positionLoadRequest(missingParcels))
}

export function* handleLoadPositionMapping(action: PositionLoadRequest): any {
  const { positions } = action.payload
  const downloadServer = yield select(getDownloadServer)
  yield all(positions.map(position => call(resolvePositionMapping, downloadServer, position)))
}

export function* resolvePositionMapping(downloadServer: string, position: string): any {
  try {
    const sceneId = yield call(resolvePositionToSceneId, downloadServer, position)
    if (!sceneId) {
      yield put(setPositionsAsEmpty([position]))
    }
    yield put(setPositionsAsResolved([position], sceneId))
  } catch (error) {
    yield put(setPositionsAsError([position], error))
  }
}

async function resolvePositionToSceneId(downloadServer: string, pos: string): Promise<string | null> {
  const nw = pos.split(',').map($ => parseInt($, 10))
  try {
    const responseContent = await memoize(downloadServer + `/scenes?x1=${nw[0]}&x2=${nw[0]}&y1=${nw[1]}&y2=${nw[1]}`)(
      fetch
    )
    const contents = responseContent as any
    if (!contents.data.length) {
      return null
    }
    return contents.data[0].scene_cid
  } catch (err) {
    defaultLogger.error(`Error in ${downloadServer}/scenes response!`, err.message)
    const ret = new Error(`Error in ${downloadServer}/scenes response!`)
    throw ret
  }
}
