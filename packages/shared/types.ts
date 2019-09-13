import { parseParcelPosition } from 'atomicHelpers/parcelScenePositions'
import { Wearable } from '../decentraland-ecs/src/decentraland/AvatarShape'
import { Vector3Component } from '../atomicHelpers/landHelpers'
import { QueryType } from 'decentraland-ecs/src/decentraland/PhysicsCast'

export type MappingsResponse = {
  parcel_id: string
  publisher: string
  root_cid: string
  contents: Array<ContentMapping>
}

export type ParcelInfoResponse = {
  scene_cid: string
  root_cid: string
  content: MappingsResponse
}

export type ContentMapping = { file: string; hash: string }

export interface MessageDict {
  [key: string]: string
}

export type UserData = {
  displayName: string
  publicKey: string
}

export type MessageEntry = {
  id: string
  sender: string
  message: string
  isCommand?: boolean
}

export interface IChatCommand {
  name: string
  description: string
  run: (message: string) => MessageEntry
}

export type RPCSendableMessage = {
  jsonrpc: '2.0'
  id: number
  method: string
  params: any[]
}

export type EntityActionType =
  | 'CreateEntity'
  | 'RemoveEntity'
  | 'SetEntityParent'
  | 'UpdateEntityComponent'
  | 'AttachEntityComponent'
  | 'ComponentCreated'
  | 'ComponentDisposed'
  | 'ComponentRemoved'
  | 'ComponentUpdated'
  | 'Query'
  | 'InitMessagesFinished'

export type QueryPayload = { queryId: string; payload: RayQuery }

export type CreateEntityPayload = { id: string }

export type RemoveEntityPayload = { id: string }
export type SceneStartedPayload = {}

export type SetEntityParentPayload = {
  entityId: string
  parentId: string
}

export type ComponentRemovedPayload = {
  entityId: string
  name: string
}

export type UpdateEntityComponentPayload = {
  entityId: string
  classId: number
  name: string
  json: string
}

export type ComponentCreatedPayload = {
  id: string
  classId: number
  name: string
}

export type AttachEntityComponentPayload = {
  entityId: string
  name: string
  id: string
}

export type ComponentDisposedPayload = {
  id: string
}

export type ComponentUpdatedPayload = {
  id: string
  json: string
}

export type EntityAction = {
  type: EntityActionType
  tag?: string
  payload: string
}

/** THIS INTERFACE CANNOT CHANGE, IT IS USED IN THE UNITY BUILD */
export type LoadableParcelScene = {
  id: string
  basePosition: { x: number; y: number }
  parcels: Array<{ x: number; y: number }>
  contents: Array<ContentMapping>
  baseUrl: string
  land: ILand
}

export const BillboardModes = {
  BILLBOARDMODE_NONE: 0,
  BILLBOARDMODE_X: 1,
  BILLBOARDMODE_Y: 2,
  BILLBOARDMODE_Z: 4,
  BILLBOARDMODE_ALL: 7
}

export const TextureSamplingMode = {
  NEAREST: 1,
  BILINEAR: 2,
  TRILINEAR: 3
}

export const TextureWrapping = {
  CLAMP: 0,
  WRAP: 1,
  MIRROR: 2
}

export type IBillboardModes = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7

export const TransparencyModes = {
  OPAQUE: 0,
  ALPHATEST: 1,
  ALPHABLEND: 2,
  ALPHATESTANDBLEND: 3
}

export type ITransparencyModes = 0 | 1 | 2 | 3

export interface ISceneCommunications {
  commServerUrl: string | null
}

/// https://github.com/decentraland/proposals/blob/master/dsp/0020.mediawiki
export interface IScene {
  assets?: Record<any, string>
  main: string
  communications: ISceneCommunications | null
  scene: {
    base: string
    parcels: string[]
  }
  spawnPoints?: SpawnPoint[]
  _mappings?: Record<string, string>
}

export type EnvironmentData<T> = {
  sceneId: string
  main: string
  baseUrl: string
  mappings: Array<ContentMapping>
  data: T
}

export interface ILand {
  /**
   * sceneId: Now it is either an internal identifier or the rootCID.
   * In the future will change to the sceneCID
   */
  sceneId: string
  scene: IScene
  baseUrl: string
  mappingsResponse: MappingsResponse
}

export type SpawnPoint = {
  name?: string
  position: {
    x: number | number[]
    y: number | number[]
    z: number | number[]
  }
  default?: boolean
  cameraTarget?: Vector3Component
}

export type SoundComponent = {
  /** Distance fading model, default: 'linear' */
  distanceModel?: 'linear' | 'inverse' | 'exponential'
  /** Does the sound loop? default: false */
  loop?: boolean
  /** The src of the sound to be played */
  src: string
  /** Volume of the sound, values 0 to 1, default: 1 */
  volume?: number
  /** Used in inverse and exponential distance models, default: 1 */
  rolloffFactor?: number
  /** Is the sound playing?, default: true */
  playing?: boolean
}

export type TransitionValue = {
  duration: number
  timing?: TimingFunction
  delay?: number
}

export type TimingFunction =
  | 'linear'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'quadratic-in'
  | 'quadratic-out'
  | 'quadratic-inout'
  | 'cubic-in'
  | 'cubic-out'
  | 'cubic-inout'
  | 'quartic-in'
  | 'quartic-out'
  | 'quartic-inout'
  | 'quintic-in'
  | 'quintic-out'
  | 'quintic-inout'
  | 'sin-in'
  | 'sin-out'
  | 'sin-inout'
  | 'exponential-in'
  | 'exponential-out'
  | 'exponential-inout'
  | 'bounce-in'
  | 'bounce-out'
  | 'bounce-inout'
  | 'elastic-in'
  | 'elastic-out'
  | 'elastic-inout'
  | 'circular-in'
  | 'circular-out'
  | 'circular-inout'
  | 'back-in'
  | 'back-out'
  | 'back-inout'

export type TransitionComponent = {
  position?: TransitionValue
  rotation?: TransitionValue
  scale?: TransitionValue
  color?: TransitionValue
  lookAt?: TransitionValue
}

export type SkeletalAnimationValue = {
  /**
   * Name of the clip (ID)
   */
  name: string

  /**
   * Name of the animation in the model
   */
  clip: string

  /**
   * Does the animation loop?, default: true
   */
  looping?: boolean

  /**
   * Weight of the animation, values from 0 to 1, used to blend several animations. default: 1
   */
  weight?: number

  /**
   * The animation speed
   */
  speed?: number

  /**
   * Is the animation playing? default: true
   */
  playing?: boolean

  /**
   * Does any anyone asked to reset the animation? default: false
   */
  shouldReset?: boolean
}

export type SkeletalAnimationComponent = {
  states: SkeletalAnimationValue[]
}

export type Profile = {
  userId: string
  name: string
  email: string
  description: string
  created_at: number
  updated_at: number
  version: string
  avatar: Avatar
}

export type Color4 = {
  r: number
  g: number
  b: number
  a: number
}

export type Avatar = {
  baseUrl: string
  wearables: Wearable[]
  bodyShape: Wearable
  skin: { color: Color4 }
  hair: { color: Color4 }
  eyes: {
    texture: string
    mask?: string
    color?: Color4
  }
  eyebrows: {
    texture: string
  }
  mouth: {
    texture: string
  }
  snapshots: {
    body: string
    face: string
  }
}

export type ProfileSpec = {
  description: string
  created_at: number
  updated_at: number
  version: string
  name: string
  avatar: AvatarSpec
}

export type AvatarSpec = {
  version: number
  skin: Colored
  hair: Colored
  eyes: Colored
  bodyShape: DclAssetUrl
  wearables: DclAssetUrl[]
  snapshots: {
    body: string
    face: string
  }
}

export type Colored = {
  color: {
    r: number
    g: number
    b: number
  }
}

export type DclAssetUrl = string

export type AvatarAsset = {
  thumbnail: string
  contents: Array<{
    file: string
    name: string
  }>
  path: string
  id: string
  name: string
  tags: string[]
  category: string
  i18n: { [language: string]: string }
  main: Array<{
    type: string
    model: string
  }>
}

export type Ray = {
  origin: Vector3Component
  direction: Vector3Component
  distance: number
}

export type RayQuery = {
  queryId: string
  queryType: QueryType
  ray: Ray
}

export function normalizeContentMappings(
  mappings: Record<string, string> | Array<ContentMapping>
): Array<ContentMapping> {
  const ret: Array<ContentMapping> = []

  if (typeof mappings.length === 'number' || mappings instanceof Array) {
    ret.push(...(mappings as any))
  } else {
    for (let key in mappings) {
      const file = key.toLowerCase()

      ret.push({ file, hash: mappings[key] })
    }
  }

  return ret
}

export function ILandToLoadableParcelScene(land: ILand): EnvironmentData<LoadableParcelScene> {
  const mappings: ContentMapping[] = normalizeContentMappings(land.mappingsResponse.contents)
  const sceneJsons = land.mappingsResponse.contents.filter(land => land.file === 'scene.json')
  if (!sceneJsons.length) {
    throw new Error('Invalid scene mapping: no scene.json')
  }

  const ret: EnvironmentData<LoadableParcelScene> = {
    sceneId: land.sceneId,
    baseUrl: land.baseUrl,
    main: land.scene.main,
    mappings,
    data: {
      id: land.sceneId,
      basePosition: parseParcelPosition(land.scene.scene.base),
      parcels:
        (land.scene &&
          land.scene.scene &&
          land.scene.scene.parcels &&
          land.scene.scene.parcels.map(parseParcelPosition)) ||
        [],
      baseUrl: land.baseUrl,
      contents: mappings,
      land
    }
  }

  return ret
}
