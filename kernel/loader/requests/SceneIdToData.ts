import { ILand } from '@dcl/utils'
import future, { IFuture } from 'fp-future'
import { SceneDataDownloadManager } from './SceneDataDownloadManager'
import { ResolutionSystem } from './ResolutionSystem'
import { PositionToSceneId } from './PositionToSceneId'

export class SceneIdToData extends ResolutionSystem<ILand<any>, ILand<any>> {
  backwardsScenePromises = new Map<string, IFuture<string>>()
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
    return await this.downloadManager.getSceneDataForSceneId(sceneId)
  }
  processResolution(_: string, data: ILand<any>) {
    if (!data) {
      this.record.get(_).loading = false
      this.record.get(_).success = false
      this.record.get(_).error = true
      this.record.get(_).promise.reject(new Error('Empty'))
      return
    }
    const sceneId = data.sceneId
    for (const pos of data.scene.scene.parcels) {
      if (!this.position.record.has(pos)) {
        if (!this.backwardsScenePromises.has(sceneId)) {
          const futureScene = future<string>()
          futureScene.resolve(sceneId)
          this.backwardsScenePromises.set(sceneId, futureScene)
        }
        const targetScenePromise = this.backwardsScenePromises.get(sceneId)
        this.position.record.set(pos, {
          loading: false,
          key: pos,
          error: false,
          data: sceneId,
          success: true,
          promise: targetScenePromise
        })
      } else {
        const record = this.position.record.get(pos)
        if (record.loading) {
          record.loading = false
          record.data = sceneId
          record.success = true
          record.promise.resolve(sceneId)
        }
      }
    }
    return data
  }
}
