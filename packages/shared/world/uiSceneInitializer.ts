import { SceneWorker } from './SceneWorker'
import { ChatController } from '../apis/ChatController'
import { SocialController } from '../apis/SocialController'
import { Observable } from 'decentraland-ecs/src'

// Create instances of non-public-controllers
export async function ensureUiApis(worker: SceneWorker) {
  const system = await worker.system
  system.getAPIInstance(ChatController)
  system.getAPIInstance(SocialController)
}

export const moveFocusObservable = new Observable()
