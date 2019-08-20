import future from 'fp-future'
import { getFromLocalStorage, saveToLocalStorage, Color4, defaultLogger } from '@dcl/utils'
import { getServerConfigurations } from '@dcl/config'

import { StoredProfile, ResolvedProfile } from './types'
import { Catalog } from '../assets/wearables/base'
import Auth from '../auth'

export class ProfileStore {
  public avatarCatalog: Catalog
  public profileMap: Map<string, StoredProfile>
  public resolvedMap: Map<string, ResolvedProfile> = new Map<string, ResolvedProfile>()

  constructor(catalog: Catalog) {
    this.profileMap = this.restoreProfileMapping()
    this.avatarCatalog = catalog
  }

  restoreProfileMapping() {
    // First version: just store it as a JSON
    const values = getFromLocalStorage('@dcl-profiles')
    const result = new Map<string, StoredProfile>()
    if (!values) {
      return result
    }
    for (let value of values) {
      result.set(value.userId, value)
    }
    return result
  }

  async getStoredProfile(auth: Auth, userId: string, versionHint?: string): Promise<StoredProfile> {
    const returnValue = future<StoredProfile>()
    if (this.profileMap.has(userId) && this.profileMap.get(userId)!.version === versionHint) {
      returnValue.resolve(this.profileMap.get(userId)!)
      return returnValue
    } else {
      try {
        const profileRequest = await getStoredPassportForUser(auth, userId)
        const profileResponse = await profileRequest.json()
        if (!profileResponse['ok']) {
          throw new Error(`Profile not found for id ${userId}`)
        }
        const storedProfile = this.saveProfile(profileResponse['data'])
        returnValue.resolve(storedProfile)
        return returnValue
      } catch (e) {
        returnValue.reject(new Error(`${userId} not found`))
        return returnValue
      }
    }
  }

  async getResolvedProfile(auth: Auth, userId: string, versionHint?: string): Promise<ResolvedProfile> {
    try {
      const returnValue = future<ResolvedProfile>()
      if ((this.resolvedMap.has(userId) && !versionHint) || this.resolvedMap.get(userId)!.version === versionHint) {
        returnValue.resolve(this.resolvedMap.get(userId)!)
        return returnValue
      } else {
        const profile = await this.getStoredProfile(auth, userId, versionHint)
        const resolved = await this.resolve(profile)
        returnValue.resolve(resolved)
        return returnValue
      }
    } catch (e) {
      throw e
    }
  }

  saveProfile(rawData: any): StoredProfile {
    const profile: StoredProfile = {
      userId: rawData.userId,
      email: rawData.email,
      avatar: rawData.profile.avatar,
      name: rawData.profile.name,
      description: rawData.profile.description,
      created_at: rawData.profile.created_at,
      updated_at: rawData.updatedAt,
      version: rawData.profile.version
    }
    this.profileMap.set(rawData.userId, profile)
    saveToLocalStorage('@dcl-profiles', [...this.profileMap.values()])
    return profile
  }

  resolve(profile: StoredProfile): ResolvedProfile {
    const result: any = { ...profile }
    const avatar = profile.avatar
    const shape: any = {}

    shape.snapshots = avatar.snapshots

    shape.skin = parseColorRGBObject(avatar.skin)
    shape.hair = parseColorRGBObject(avatar.hair)

    shape.baseUrl = getServerConfigurations().content + '/contents'
    shape.wearables = []

    const defaults = DEFAULT_ASSETS[avatar.bodyShape]

    defaults.concat(avatar.wearables).forEach(wearable => {
      const name = stripDclUriFrom(wearable)
      const asset = this.avatarCatalog[avatar.bodyShape][name]
      const model = asset.main.model
      const contents = asset.contents.filter($ => $.name === model)
      if (contents.length === 0) {
        defaultLogger.error(`Content ${model} not found for asset ${name}`)
      }
      const file = contents[0].file

      const contents1 = asset.contents.map($ => ({ file: $.name, hash: $.file }))

      const result = model.match(/(\w*)\.(\w*)/)!
      const maskName = `${result[1]}_Mask.${result[2]}`
      const maskContents = asset.contents.filter($ => $.name === maskName)
      const mask = maskContents.length === 0 ? undefined : contents[0].file

      switch (asset.category) {
        case 'body_shape':
          shape.bodyShape = { category: asset.category, contentName: model, contents: contents1 }
          break
        case 'eyebrows':
          shape.eyebrows = { texture: file }
          break
        case 'mouth':
          shape.mouth = { texture: file }
          break
        case 'eyes':
          shape.eyes = {
            texture: file,
            mask: mask,
            color: parseColorRGBObject({ color: avatar.eyes ? avatar.eyes.color : { r: 0, g: 0, b: 0 } })
          }
          break
        default:
          const wearable = { category: asset.category, contentName: model, contents: contents1 }
          shape.wearables.push(wearable)
          break
      }
    })

    return result as ResolvedProfile
  }
}

function parseColorRGBObject(object: { color: { r: number; g: number; b: number } }) {
  return new Color4(object.color.r, object.color.g, object.color.b)
}

async function getStoredPassportForUser(auth: Auth, userId: string) {
  return fetch(`https://avatars-api.decentraland.org/api/profile/${userId}`, {
    headers: {
      Authorization: 'Bearer ' + auth.userToken
    }
  })
}

const DCL_ASSET_BASE_URL = '@dcl://base-avatars/'

function stripDclUriFrom(url: string) {
  return url.slice(DCL_ASSET_BASE_URL.length)
}

function toDclAssetUrl(assetName: string) {
  return DCL_ASSET_BASE_URL + assetName
}

const DEFAULT_ASSETS: { [base: string]: Array<string> } = {}
DEFAULT_ASSETS[toDclAssetUrl('BaseMale')] = ['eyes_00', 'eyebrows_00', 'mouth_00'].map($ => toDclAssetUrl($))
DEFAULT_ASSETS[toDclAssetUrl('BaseFemale')] = ['f_eyes_00', 'f_eyebrows_00', 'f_mouth_00'].map($ => toDclAssetUrl($))
