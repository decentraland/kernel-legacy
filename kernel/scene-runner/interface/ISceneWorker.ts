import { ScriptingTransport } from '@dcl/rpc/common/json-rpc/types'
import { Observable, ISceneManifest } from '@dcl/utils'

export interface ISceneWorker {
  scene: ISceneManifest
  transport: ScriptingTransport
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}
