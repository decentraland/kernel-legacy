import { ScriptingTransport } from '@dcl/rpc/common/json-rpc/types'

import { Observable } from '@dcl/utils'
import { SceneManifest } from 'client/worldMap/scene/SceneManifest'

export interface ISceneWorker {
  scene: SceneManifest
  transport: ScriptingTransport
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}
