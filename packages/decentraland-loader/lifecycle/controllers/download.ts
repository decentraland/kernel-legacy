import { future, IFuture } from 'fp-future'

import { ILand, IScene, ParcelInfoResponse } from 'shared/types'
import { jsonFetch } from 'atomicHelpers/jsonFetch'
import { createLogger } from 'shared/logger'

const logger = createLogger('loader')
const { error } = logger

export type SceneMappingResponse = {
  data: Array<{
    parcel_id: string
    root_cid: string
  }>
}

export class SceneDataDownloadManager {
  positionToSceneId: Map<string, IFuture<string | null>> = new Map()
  sceneIdToLandData: Map<string, IFuture<ILand | null>> = new Map()
  rootIdToLandData: Map<string, IFuture<ILand | null>> = new Map()

  constructor(public options: { contentServer: string }) {
    // stub
  }

  async resolveSceneSceneId(pos: string): Promise<string | null> {
    if (this.positionToSceneId.has(pos)) {
      return this.positionToSceneId.get(pos)!
    }
    const promised = future<string | null>()
    this.positionToSceneId.set(pos, promised)
    const nw = pos.split(',').map($ => parseInt($, 10))
    const responseContent = await fetch(
      this.options.contentServer + `/scenes?x1=${nw[0]}&x2=${nw[0]}&y1=${nw[1]}&y2=${nw[1]}`
    )

    if (!responseContent.ok) {
      error(`Error in ${this.options.contentServer}/scenes response!`, responseContent)
      const ret = new Error(`Error in ${this.options.contentServer}/scenes response!`)
      promised.reject(ret)
      throw ret
    } else {
      const contents = (await responseContent.json()) as SceneMappingResponse
      if (!contents.data.length) {
        promised.resolve(null)
        return null
      }
      this.setSceneRoots(contents)
    }
    return promised
  }

  setSceneRoots(contents: SceneMappingResponse) {
    for (let result of contents.data) {
      const promised = this.positionToSceneId.get(result.parcel_id) || future<string>()
      if (promised.isPending) {
        promised.resolve(result.root_cid)
      }
    }
  }

  async resolveLandData(sceneId: string): Promise<ILand | null> {
    if (this.sceneIdToLandData.has(sceneId)) {
      return this.sceneIdToLandData.get(sceneId)!
    }
    const promised = future<ILand | null>()
    this.sceneIdToLandData.set(sceneId, promised)
    const actualResponse = await fetch(this.options.contentServer + `/parcel_info?cids=${sceneId}`)
    if (!actualResponse.ok) {
      error(`Error in ${this.options.contentServer}/parcel_info response!`, actualResponse)
      const ret = new Error(`Error in ${this.options.contentServer}/parcel_info response!`)
      promised.reject(ret)
      throw ret
    }
    const mappings = (await actualResponse.json()) as { data: ParcelInfoResponse[] }
    if (!promised.isPending) {
      return promised
    }
    const content = mappings.data[0]
    if (!content || !content.content || !content.content.contents) {
      logger.info(`Resolved ${sceneId} to null -- no contents`, content)
      promised.resolve(null)
      return null
    }
    const sceneJsonMapping = content.content.contents.find($ => $.file === 'scene.json')

    if (!sceneJsonMapping) {
      logger.info(`Resolved ${sceneId} to null -- no sceneJsonMapping`)
      promised.resolve(null)
      return null
    }

    const baseUrl = this.options.contentServer + '/contents/'
    const scene = (await jsonFetch(baseUrl + sceneJsonMapping.hash)) as IScene

    if (!promised.isPending) {
      return promised
    }

    const data: ILand = {
      sceneId: sceneId,
      baseUrl,
      scene,
      mappingsResponse: content.content
    }

    const pendingSceneData = this.sceneIdToLandData.get(sceneJsonMapping.hash)! || future<ILand | null>()
    if (pendingSceneData.isPending) {
      pendingSceneData.resolve(data)
      if (!this.sceneIdToLandData.has(sceneJsonMapping.hash)) {
        this.sceneIdToLandData.set(sceneJsonMapping.hash, pendingSceneData)
      }
    }
    promised.resolve(data)
    return data
  }

  async getParcelDataBySceneId(sceneId: string): Promise<ILand | null> {
    return this.sceneIdToLandData.get(sceneId)!
  }

  async getParcelData(position: string): Promise<ILand | null> {
    const sceneId = await this.resolveSceneSceneId(position)
    if (sceneId === null) {
      return null
    }
    return this.resolveLandData(sceneId)
  }
}
