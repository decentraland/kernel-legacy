import { ILand } from '@dcl/utils'
import { PositionToSceneId } from './PositionToSceneId'
import { ResolutionSystem } from './ResolutionSystem'
import { SceneDataDownloadManager } from './SceneDataDownloadManager'

export class SceneIdToData extends ResolutionSystem<ILand<any>> {
  constructor(public downloadManager: SceneDataDownloadManager, public position: PositionToSceneId) {
    super()
  }
  hasScene(sceneId: string): boolean {
    return this.record.has(sceneId)
  }
  getScene(sceneId: string): ILand<any> | undefined {
    return this.record.has(sceneId) && this.record.get(sceneId).data
  }
  async executeResolution(sceneId: string) {
    const data = await this.downloadManager.getSceneDataForSceneId(sceneId)
    return data
  }
  processResolution(_: string, data: ILand<any>) {
    if (!data || !data.sceneId || !data.scene || !data.scene.scene || !data.scene.scene.parcels) {
      return data
    }
    const sceneId = data.sceneId
    for (const pos of data.scene.scene.parcels) {
      this.position.storeResolution(pos, sceneId)
    }
    return data
  }
}
