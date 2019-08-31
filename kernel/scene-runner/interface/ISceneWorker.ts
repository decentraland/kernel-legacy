import { ScriptingTransport } from '@dcl/rpc/common/json-rpc/types'
import { Observable } from '../userSpace/node_modules/@dcl/utils'

import { SceneManifest } from '../../worldMap/scene/SceneManifest'

export interface ISceneWorker {
  scene: SceneManifest
  transport: ScriptingTransport
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}
