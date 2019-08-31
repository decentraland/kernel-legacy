import { IScene, ILand, ParcelInfoResponse, error, defaultLogger } from '@dcl/utils'
import { jsonFetch } from '@dcl/utils/network'

export class SceneDataDownloadManager {
  constructor(
    public options: {
      contentServer: string
    }
  ) {
    // stub
  }

  async resolvePositionToSceneId(pos: string): Promise<string | null> {
    const nw = pos.split(',').map($ => parseInt($, 10))
    try {
      const responseContent = await jsonFetch(
        this.options.contentServer + `/scenes?x1=${nw[0]}&x2=${nw[0]}&y1=${nw[1]}&y2=${nw[1]}`
      )
      const contents = responseContent as any
      if (!contents.data.length) {
        return null
      }
      return contents.data[0].scene_cid
    } catch (err) {
      error(`Error in ${this.options.contentServer}/scenes response!`, err.message)
      const ret = new Error(`Error in ${this.options.contentServer}/scenes response!`)
      throw ret
    }
  }

  async getSceneDataForSceneId(sceneId: string): Promise<ILand<any> | null> {
    try {
      const actualResponse = await jsonFetch(this.options.contentServer + `/parcel_info?cids=${sceneId}`)
      const mappings = actualResponse as {
        data: ParcelInfoResponse[]
      }
      const content = mappings.data[0]
      if (!content || !content.content || !content.content.contents) {
        // defaultLogger.info(`Resolved ${sceneId} to null -- no contents`, content)
        return null
      }
      const sceneJsonMapping = content.content.contents.find($ => $.file === 'scene.json')
      if (!sceneJsonMapping) {
        defaultLogger.info(`Resolved ${sceneId} to null -- no sceneJsonMapping`)
        return null
      }
      const baseUrl = this.options.contentServer + '/contents/'
      const scene = (await jsonFetch(baseUrl + sceneJsonMapping.hash)) as IScene
      return {
        sceneId: sceneId,
        baseUrl,
        scene,
        mappingsResponse: content.content
      }
    } catch (err) {
      error(`Error in ${this.options.contentServer}/parcel_info response!`, err.message)
      const ret = new Error(`Error in ${this.options.contentServer}/parcel_info response!`)
      throw ret
    }
  }

  async getSceneDataForPosition(position: string): Promise<ILand<any> | null> {
    const sceneId = await this.resolvePositionToSceneId(position)
    if (sceneId === null) {
      return null
    }
    return this.getSceneDataForSceneId(sceneId)
  }
}
