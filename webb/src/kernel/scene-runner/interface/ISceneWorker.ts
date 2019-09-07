import { ScriptingTransport } from '@dcl/rpc/common/json-rpc/types'
import { Observable, ISceneManifest } from '@dcl/utils'

/**
 * Interface to keep track of the Workers we run with their scenes on top
 */
export interface ISceneWorker {
  sceneManifest: ISceneManifest
  transport: ScriptingTransport
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}
