import { takeLatest, select, call, put } from 'redux-saga/effects'
import { SET_POSITION_AS_RESOLVED, SetPositionsAsResolvedAction } from '../PositionToSceneId/actions'
import { needsResolutionToManifest, getDownloadServer } from './selectors'
import { getKeysMappingToTrue, booleanMap, jsonFetch, defaultLogger, IScene, ParcelInfoResponse } from '@dcl/utils'
import { sceneByIdRequest, SCENE_BY_ID_REQUEST, SceneByIdRequest, sceneByIdFailure, sceneByIdSuccess } from './types'

export function* sceneIdToManifestSaga() {
  yield takeLatest(SET_POSITION_AS_RESOLVED, fetchMissingSceneManifest)
  yield takeLatest(SCENE_BY_ID_REQUEST, handleFetchRequest)
}

export function* fetchMissingSceneManifest(resolvedPosition: SetPositionsAsResolvedAction) {
  const needsResolution = (yield select(needsResolutionToManifest, resolvedPosition.payload.positions)) as booleanMap
  const missingSceneIds = getKeysMappingToTrue(needsResolution)
  for (let sceneId of missingSceneIds) {
    yield put(sceneByIdRequest(sceneId))
  }
}

export function* handleFetchRequest(action: SceneByIdRequest) {
  const downloadServer = yield select(getDownloadServer)
  const { sceneId } = action.payload
  try {
    const mapping = yield call(fetchManifestForSceneId, downloadServer, sceneId)
    yield put(sceneByIdSuccess(sceneId, mapping))
  } catch (error) {
    yield put(sceneByIdFailure(sceneId, error))
  }
}

export async function fetchManifestForSceneId(downloadServer: string, sceneId: string) {
  try {
    const actualResponse = await jsonFetch(downloadServer + `/parcel_info?cids=${sceneId}`)
    const mappings = actualResponse as {
      data: ParcelInfoResponse[]
    }
    const content = mappings.data[0]
    if (!content || !content.content || !content.content.contents) {
      // defaultLogger.info(`Resolved ${sceneId} to null -- no contents`, content)
      return null
    }
    const sceneJsonMapping = content.content.contents.find($ => $.file === 'scene.json')
    if (!sceneJsonMapping) {
      defaultLogger.info(`Resolved ${sceneId} to null -- no sceneJsonMapping`)
      return null
    }
    const baseUrl = downloadServer + '/contents/'
    const scene = (await jsonFetch(baseUrl + sceneJsonMapping.hash)) as IScene
    return {
      sceneId: sceneId,
      baseUrl,
      scene,
      mappingsResponse: content.content
    }
  } catch (error) {
    defaultLogger.error(`Error in ${downloadServer}/parcel_info response!`, error.stack)
    throw error
  }
}
