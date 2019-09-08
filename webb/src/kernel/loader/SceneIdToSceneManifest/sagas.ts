import { defaultLogger, IScene, memoize, ParcelInfoResponse } from '@dcl/utils'
import { call, put, select, takeLatest, all } from 'redux-saga/effects'
import { SetPositionsAsResolvedAction, SET_POSITION_AS_RESOLVED } from '../PositionToSceneId/actions'
import { getDownloadServer, isMappingResolved, needsResolutionToManifest } from './selectors'
import { sceneByIdFailure, sceneByIdRequest, SceneByIdRequest, sceneByIdSuccess, SCENE_BY_ID_REQUEST } from './types'
import { migrateFromILand } from '~/kernel/worldMap/sceneTransforms/migrateFromILand'

export function* sceneIdToManifestSaga(): any {
  yield takeLatest(SET_POSITION_AS_RESOLVED, fetchMissingSceneManifest)
  yield takeLatest(SCENE_BY_ID_REQUEST, handleFetchRequest)
}

export function* fetchMissingSceneManifest(resolvedPosition: SetPositionsAsResolvedAction): any {
  if (resolvedPosition.payload.sceneId) {
    const needsResolution = yield select(needsResolutionToManifest, resolvedPosition.payload.sceneId)
    if (needsResolution) {
      yield put(sceneByIdRequest(resolvedPosition.payload.sceneId))
    }
  }
}

export function* handleFetchRequest(action: SceneByIdRequest): any {
  const downloadServer = yield select(getDownloadServer)
  const { sceneId } = action.payload
  try {
    const mapping = yield call(fetchManifestForSceneId, downloadServer, sceneId)
    const someoneUpdatedItAlready = yield select(isMappingResolved, sceneId)
    if (!someoneUpdatedItAlready) {
      yield put(sceneByIdSuccess(sceneId, mapping))
    }
  } catch (error) {
    yield put(sceneByIdFailure(sceneId, error))
  }
}

export async function fetchManifestForSceneId(downloadServer: string, sceneId: string) {
  try {
    const actualResponse = await memoize(downloadServer + `parcel_info?cids=${sceneId}`)(fetch)
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
    const sceneData = (await memoize(baseUrl + sceneJsonMapping.hash)(fetch)) as IScene
    const scene = migrateFromILand(sceneData, mappings)
    scene.id = sceneId
    return scene
  } catch (error) {
    defaultLogger.error(`Error in ${downloadServer}/parcel_info response!`, error.stack)
    throw error
  }
}
