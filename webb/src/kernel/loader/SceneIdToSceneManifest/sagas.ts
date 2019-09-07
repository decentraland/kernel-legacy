import { booleanMap, defaultLogger, IScene, memoize, ParcelInfoResponse } from '@dcl/utils'
import { call, put, select, takeLatest } from 'redux-saga/effects'
import { SetPositionsAsResolvedAction, SET_POSITION_AS_RESOLVED, setPositionsAsResolved } from '../PositionToSceneId/actions'
import { getDownloadServer, needsResolutionToManifest } from './selectors'
import { sceneByIdFailure, sceneByIdRequest, SceneByIdRequest, sceneByIdSuccess, SCENE_BY_ID_REQUEST } from './types'

export function* sceneIdToManifestSaga(): any {
  yield takeLatest(SET_POSITION_AS_RESOLVED, fetchMissingSceneManifest)
  yield takeLatest(SCENE_BY_ID_REQUEST, handleFetchRequest)
}

export function* fetchMissingSceneManifest(resolvedPosition: SetPositionsAsResolvedAction): any {
  const needsResolution = yield select(needsResolutionToManifest, resolvedPosition.payload.sceneId)
  if (needsResolution) {
    yield put(sceneByIdRequest(resolvedPosition.payload.sceneId))
  }
}

export function* handleFetchRequest(action: SceneByIdRequest): any {
  const downloadServer = yield select(getDownloadServer)
  const { sceneId } = action.payload
  try {
    const mapping = yield call(fetchManifestForSceneId, downloadServer, sceneId)
    yield put(sceneByIdSuccess(sceneId, mapping))
    yield put(setPositionsAsResolved(mapping.scene.scene.parcels, sceneId))
  } catch (error) {
    yield put(sceneByIdFailure(sceneId, error))
  }
}

export async function fetchManifestForSceneId(downloadServer: string, sceneId: string) {
  try {
    const actualResponse = await memoize(downloadServer + `/parcel_info?cids=${sceneId}`)(fetch)
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
    const scene = (await memoize(baseUrl + sceneJsonMapping.hash)(fetch)) as IScene
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
