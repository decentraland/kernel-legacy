import { ScriptingTransport } from './node_modules/@dcl/rpc'
export function bootstrapScene(scene: any, transport?: ScriptingTransport) {
  return new SceneWorker(scene, transport)
}
