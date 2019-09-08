import { ScriptingTransport } from '@dcl/rpc/common/json-rpc/types'
import { Observable, ISceneManifest } from '@dcl/utils'

/**
 * Interface to keep track of the Workers we run with their scenes on top. This is useful for alternative renderers,
 * like the builder and the CLI, so that they can inspect the state of the workers and handle any particularity.
 */
export interface ISceneWorker {
  sceneManifest: ISceneManifest
  transport: ScriptingTransport
  persistent: boolean
  dispose: Function
  onDisposeObservable: Observable<string>
}
