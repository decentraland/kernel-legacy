import { SceneDataDownloadManager } from './SceneDataDownloadManager'
import { ResolutionSystem } from './ResolutionSystem'

export class PositionToSceneId extends ResolutionSystem<string, string> {
  constructor(public downloadManager: SceneDataDownloadManager) {
    super()
  }
  async executeResolution(position: string) {
    return await this.downloadManager.resolvePositionToSceneId(position)
  }
  processResolution(x: string, data: string) {
    return data
  }
}
