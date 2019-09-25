import { Profile, AvatarAsset, Colored, DclAssetUrl, ProfileSpec, Avatar, AvatarSpec } from '../types'
import { Color4 } from '../../decentraland-ecs/src/decentraland/math/Color4'
import { getServerConfigurations, PREVIEW } from '../../config/index'
import defaultLogger from '../logger'

export async function resolveProfile(accessToken: string, uuid: string): Promise<Profile> {
  let response
  if (!PREVIEW) {
    try {
      response = await fetchProfile(accessToken, uuid)
    } catch (e) {
      defaultLogger.error(`failed to fetch profile for ${uuid ? 'user id ' + uuid : 'current user'}`)
      defaultLogger.error(e)
    }
  }

  let spec: ProfileSpec
  if (response && response.ok) {
    // @ts-ignore
    spec = (await response.json()) as ProfileSpec
  } else {
    const legacy = await fetchLegacy(accessToken, uuid)
    if (!PREVIEW && legacy && legacy.ok) {
      spec = legacyToSpec((await legacy.json()).data)
    } else {
      spec = await createStubProfileSpec()
    }
  }

  return resolveProfileSpec(uuid, spec)
}

export async function resolveProfileSpec(uuid: string, spec: ProfileSpec, email?: string): Promise<Profile> {
  const avatar = await mapSpecToAvatar(spec.avatar)

  // TODO - fetch name from claim server - moliva - 22/07/2019
  const name = spec.name || `Guest_${uuid.replace('email|', '').slice(0, 7)}` // strip email| from auth0 uuid

  return {
    userId: uuid,
    name: name,
    email: email || `${name}@decentraland.org`,
    description: spec.description,
    created_at: spec.created_at,
    updated_at: spec.updated_at,
    version: spec.version,
    avatar
  }
}

export async function createStubProfileSpec(uuid = ('' + Math.random()).slice(2, 9)): Promise<ProfileSpec> {
  const name = `Guest_${uuid.replace('email|', '').slice(0, 7)}` // strip email| from auth0 uuid
  return {
    name,
    description: '',
    updated_at: 1,
    created_at: 1,
    version: '0',
    avatar: await generateRandomAvatarSpec()
  }
}

async function fetchAvatarCatalog(): Promise<AvatarAsset[]> {
  const response = await fetch(getServerConfigurations().avatar.catalog)
  return (await response.json()).data
}

function fromColored(colored: Colored): { color: Color4 } {
  const color = colored.color
  return { color: new Color4(color.r, color.g, color.b) }
}

const DCL_ASSET_BASE_URL = 'dcl://base-avatars/'

function fromDclAssertUrl(url: DclAssetUrl): string {
  return url.slice(DCL_ASSET_BASE_URL.length)
}

function toDclAssertUrl(assetName: string): DclAssetUrl {
  return DCL_ASSET_BASE_URL + assetName
}

const DEFAULT_ASSETS: { [base: string]: Array<DclAssetUrl> } = {}
DEFAULT_ASSETS[toDclAssertUrl('BaseMale')] = ['eyes_00', 'eyebrows_00', 'mouth_00'].map($ => toDclAssertUrl($))
DEFAULT_ASSETS[toDclAssertUrl('BaseFemale')] = ['f_eyes_00', 'f_eyebrows_00', 'f_mouth_00'].map($ => toDclAssertUrl($))

async function mapSpecToAvatar(avatar: AvatarSpec): Promise<Avatar> {
  const shape: any = {}

  const avatarCatalog = await fetchAvatarCatalog()

  shape.snapshots = avatar.snapshots

  shape.skin = fromColored(avatar.skin)
  shape.hair = fromColored(avatar.hair)

  const type = fromDclAssertUrl(avatar.bodyShape)

  shape.baseUrl = getServerConfigurations().avatar.contents
  shape.wearables = []

  const defaults = DEFAULT_ASSETS[avatar.bodyShape]

  defaults.concat(avatar.wearables).forEach(wearable => {
    const name = fromDclAssertUrl(wearable)
    const assets = avatarCatalog.filter($ => $.name === name)
    if (assets.length === 0) {
      defaultLogger.error(`Asset with name ${name} not found`)
    }
    const asset = assets[0]
    const mains = asset.main.filter($ => $.type === type)
    if (mains.length === 0) {
      defaultLogger.error(`Asset ${name} does not have type ${type}`)
    }
    const model = mains[0].model
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
        shape.eyes = { texture: file, mask: mask, color: avatar.eyes && fromColored(avatar.eyes).color }
        break
      default:
        const wearable = { category: asset.category, contentName: model, contents: contents1 }
        shape.wearables.push(wearable)
        break
    }
  })

  return shape as Avatar
}

export async function fetchLegacy(accessToken: string, uuid: string) {
  const authHeader = {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  const request = `${getServerConfigurations().avatar.server}api/profile${uuid ? '/' + uuid : ''}`
  let response = await fetch(request, authHeader)
  return response
}

export function legacyToSpec(legacy: any) {
  const { profile, /* email, */ snapshots, updatedAt, userId } = legacy
  const { created_at, description, name, avatar } = profile
  return {
    description,
    created_at,
    updated_at: updatedAt,
    version: updatedAt,
    name,
    avatar: { ...avatar, snapshots, name, userId }
  }
}

export async function fetchProfile(accessToken: string, uuid: string) {
  const authHeader = {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  const request = `${getServerConfigurations().profile}/profile/${uuid}`

  return fetch(request, authHeader)
}

export async function createProfile(accessToken: string, avatar: AvatarSpec) {
  const body = JSON.stringify(avatar)
  const options = {
    method: 'PUT',
    body,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }

  const request = `${getServerConfigurations().profile}/profile/avatar`
  const response = await fetch(request, options)

  return response
}

const sexes = ['female', 'male']
const skins = ['7d5d47', '522c1c', 'cc9b77', 'f2c2a5', 'ffe4c6']
const numbers = [
  '00001',
  '00002',
  '00003',
  '00004',
  '00005',
  '00006',
  '00007',
  '00008',
  '00009',
  '00010',
  '00011',
  '00012',
  '00013',
  '00014',
  '00015',
  '00016'
]

export async function generateRandomAvatarSpec(): Promise<AvatarSpec> {
  const sex = randomIn(sexes)
  const skin = randomIn(skins)
  const _number = randomIn(numbers)

  const baseUrl = `${getServerConfigurations().avatar.presets}/${sex}/${skin}/${_number}`

  const response = await fetch(`${baseUrl}/avatar.json`)
  const avatarJson = await response.json()

  return {
    ...avatarJson,
    snapshots: {
      face: `${baseUrl}/face.png`,
      body: `${baseUrl}/body.png`
    }
  }
}

function randomIn(array: any[]) {
  return array[Math.floor(Math.random() * array.length)]
}
