import { SceneDataDownloadManager } from './SceneDataDownloadManager'
import { ResolutionSystem } from './ResolutionSystem'

export class PositionToSceneId extends ResolutionSystem<string, string> {
  constructor(public downloadManager: SceneDataDownloadManager) {
    super()
  }
  getScene(position: string): string | undefined {
    return this.record.has(position) && this.record.get(position).data
  }
  hasScene(position: string): boolean {
    return this.record.has(position)
  }
  executeResolution(position: string) {
    return this.downloadManager.resolvePositionToSceneId(position)
  }
  processResolution(x: string, data: string) {
    return data
  }
}
