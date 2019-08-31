import { ScriptingTransport } from '@dcl/rpc'
import { SceneWorker } from './SceneWorker'

export function bootstrapScene(scene: any, transport?: ScriptingTransport) {
  return new SceneWorker(scene, transport)
}
