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
import {
  getDownloadServer,
  needsResolution,
  multipleNeedsResolution,
  hasFinishedLoadingPositionMapping
} from './selectors'

export function* positionToSceneIdSaga(): any {
  yield takeLatest(FORGET_POSITION, fetchMissingSceneIdMappings)
  yield takeLatest(SET_POSITION, fetchMissingSceneIdMappings)
  yield takeLatest(POSITION_LOADING_REQUEST, handleLoadPositionMapping)
}

export function* fetchMissingSceneIdMappings(): any {
  const delta = yield select(allInSight)
  const needsResolution = yield select(multipleNeedsResolution, delta)
  const missingParcels = getKeysMappingToTrue(needsResolution)
  if (missingParcels.length) {
    yield put(positionLoadRequest(missingParcels))
  }
}

export function* handleLoadPositionMapping(action: PositionLoadRequest): any {
  const { positions } = action.payload
  const downloadServer = yield select(getDownloadServer)
  // Heuristically fetch the first parcel first, then the rest (spawning in center of plaza)
  yield call(resolvePositionMapping, downloadServer, positions[0])
  yield all(positions.slice(1).map(position => call(resolvePositionMapping, downloadServer, position)))
}

export function* resolvePositionMapping(downloadServer: string, position: string): any {
  try {
    const shouldUpdate = yield select(needsResolution, position)
    if (shouldUpdate) {
      const mapping = yield call(resolvePositionToSceneId, downloadServer, position)
      const stillNeedsUpdate = yield select(hasFinishedLoadingPositionMapping, position)
      if (stillNeedsUpdate) {
        if (!mapping) {
          yield put(setPositionsAsEmpty([position]))
        }
        yield put(setPositionsAsResolved(mapping.positions, mapping.sceneId))
      }
    }
  } catch (error) {
    yield put(setPositionsAsError([position], error))
  }
}

async function resolvePositionToSceneId(
  downloadServer: string,
  pos: string
): Promise<{ sceneId: string; positions: string[] } | null> {
  const nw = pos.split(',').map($ => parseInt($, 10))
  try {
    const responseContent = await memoize(downloadServer + `/scenes?x1=${nw[0]}&x2=${nw[0]}&y1=${nw[1]}&y2=${nw[1]}`)(
      fetch
    )
    const contents = responseContent as any
    if (!contents.data.length) {
      return null
    }
    return {
      sceneId: contents.data[0].scene_cid,
      positions: contents.data.reduce((cumm: string[], data: { parcel_id: string }) => {
        cumm.push(data.parcel_id)
        return cumm
      }, [])
    }
  } catch (err) {
    defaultLogger.error(`Error in ${downloadServer}/scenes response!`, err.message)
    const ret = new Error(`Error in ${downloadServer}/scenes response!`)
    throw ret
  }
}
