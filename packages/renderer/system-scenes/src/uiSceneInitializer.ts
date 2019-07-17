import { SceneWorker } from '../../scenes/src/worker/SceneWorker'
import { ChatController } from '../../chat/ChatController'
import { SocialController } from '../../scene-lifecycle/src/handler/apis/SocialController'

// Create instances of non-public-controllers
export async function ensureUiApis(worker: SceneWorker) {
  const system = await worker.system
  system.getAPIInstance(ChatController)
  system.getAPIInstance(SocialController)
}
