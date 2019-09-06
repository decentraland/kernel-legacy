import { call, put, select, takeLatest } from 'redux-saga/effects'

import { defaultLogger, getKeysMappingToTrue, jsonFetch } from '@dcl/utils'

import { SET_POSITION } from '../ParcelSight/actions'
import { allInSight } from '../ParcelSight/selectors'
import {
  setPositionsAsEmpty,
  setPositionsAsError,
  positionLoadingRequest,
  PositionLoadingRequest,
  setPositionsAsResolved,
  POSITION_LOADING_REQUEST
} from './actions'
import { multipleNeedsResolution, getDownloadServer } from './selectors'

export function* positionToSceneIdSaga() {
  yield takeLatest(SET_POSITION, fetchMissingSceneIdMappings)
  yield takeLatest(POSITION_LOADING_REQUEST, handleLoadPositionMapping)
}

export function* fetchMissingSceneIdMappings() {
  const delta = yield select(allInSight)
  const needsResolution = yield select(multipleNeedsResolution, delta)
  const missingParcels = getKeysMappingToTrue(needsResolution)
  yield put(positionLoadingRequest(missingParcels))
}

export function* handleLoadPositionMapping(action: PositionLoadingRequest) {
  const { positions } = action.payload
  const downloadServer = yield select(getDownloadServer)
  for (let position of positions) {
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
}

async function resolvePositionToSceneId(downloadServer: string, pos: string): Promise<string | null> {
  const nw = pos.split(',').map($ => parseInt($, 10))
  try {
    const responseContent = await jsonFetch(downloadServer + `/scenes?x1=${nw[0]}&x2=${nw[0]}&y1=${nw[1]}&y2=${nw[1]}`)
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
