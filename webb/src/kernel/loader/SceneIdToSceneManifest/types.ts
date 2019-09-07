import { action } from 'typesafe-actions'
import { ISceneManifest } from '@dcl/utils'

export type SceneIdToSceneManifestState = {
  downloadServer: string
  scenesById: Record<string, ISceneManifest>
  loading: Record<string, boolean>
  errors: Record<string, any>
}

export const CONFIGURE_DOWNLOAD_SERVER = 'Set download server on SceneId -> Manifest resolver'
export const SCENE_BY_ID_REQUEST = 'Fetch Scene Manifest for ID [Request]'
export const SCENE_BY_ID_SUCCESS = 'Fetch Scene Manifest for ID [Success]'
export const SCENE_BY_ID_FAILURE = 'Fetch Scene Manifest for ID [Failure]'

export const sceneByIdRequest = (sceneId: string) => action(SCENE_BY_ID_REQUEST, { sceneId })
export const sceneByIdSuccess = (sceneId: string, scene: ISceneManifest) =>
  action(SCENE_BY_ID_SUCCESS, { sceneId, scene })
export const sceneByIdFailure = (sceneId: string, error: any) => action(SCENE_BY_ID_FAILURE, { sceneId, error })
export const configureDownloadServer = (downloadServer: string) => action(CONFIGURE_DOWNLOAD_SERVER, { downloadServer })

export type SceneByIdRequest = ReturnType<typeof sceneByIdRequest>
export type SceneByIdSuccess = ReturnType<typeof sceneByIdSuccess>
export type SceneByIdFailure = ReturnType<typeof sceneByIdFailure>
export type ConfigureDownloadServer = ReturnType<typeof configureDownloadServer>

export type SceneByIdAction = SceneByIdRequest | SceneByIdFailure | SceneByIdSuccess | ConfigureDownloadServer

export type RootSceneIdToSceneManifestState = {
  sceneIdToManifest: SceneIdToSceneManifestState
}
