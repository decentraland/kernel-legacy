import { Vector3, Vector2, Quaternion, QuaternionRange, Coordinate } from '@dcl/utils/dist/Vector'
export type NamedAsset = { name: string; hash: string }
export type URIAsset = { name: string; uri: string }

export type AssetDefinition = NamedAsset | URIAsset

export type NonEmptyStringArray = [string, ...string[]]
export type AssetTagDefinition = {
  name: string
  assets: NonEmptyStringArray
}

export type Range2 = [number, number]
export type NumberOrRange = number | Range2

export type Vector3Range = {
  x: NumberOrRange
  y: NumberOrRange
  z: NumberOrRange
}

export type QuaternionRange = {
  x: NumberOrRange
  y: NumberOrRange
  z: NumberOrRange
  w: NumberOrRange
}

export type PartialVector3 = Partial<Vector3>

export type YRotation = {
  y: NumberOrRange
}

export type Coordinate = {
  x: number
  y: number
}

export type CoordinateDefinition = string | Coordinate

export type DisplayDefinition = {
  title?: string
  snapshot?: string
}

export type ReferenceSystem = {
  rotation?: YRotation
  position?: Vector3Range
}

export type SpawnPoint = {
  name?: string
  position: Vector3Range
  camera: QuaternionRange | YRotation
  default?: boolean
}

export type NonEmptyCoordinateDefinitionArray = [CoordinateDefinition, ...CoordinateDefinition[]]
export type NonEmptyCoordinateArray = [Coordinate, ...Coordinate[]]

export interface SceneJson {
  version: number
  assets: AssetDefinition[]
  assetTags?: AssetTagDefinition[]
  requiredTags?: string[]
  main: string
  referenceSystem?: ReferenceSystem
  parcels: NonEmptyCoordinateDefinitionArray
  contact?: Record<string, string>
  spawnPoints?: [SpawnPoint, ...SpawnPoint[]]
  display?: DisplayDefinition
}

export interface WellDefinedScene {
  version: number
  assets: AssetDefinition[]
  assetTags: AssetTagDefinition[]
  requiredAssets: AssetDefinition[]
  main: string
  referenceSystem: ReferenceSystem
  parcels: NonEmptyCoordinateArray
  spawnPoints: SpawnPoint[]
  title: string
  screenshot: string
}
