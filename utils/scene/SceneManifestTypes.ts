import { Vector3 } from '../Vector'

export interface UnsanitizedSceneManifest {
  version: number
  assets: AssetDefinition[]
  assetTags?: AssetTagDefinition[]
  requiredTags?: string[]
  main: string
  referenceSystem?: ReferenceSystem
  parcels: NonEmptyCoordinateDefinitionArray
  contact?: Record<string, string>
  spawnPoints?: [SpawnPointDefinition, ...SpawnPointDefinition[]]
  display?: DisplayDefinition
}

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

export type SpawnPointDefinition = {
  name?: string
  position: Vector3Range
  camera: Vector3
  default?: boolean
}

export type SpawnPointSelection = {
  name?: string
  position: Vector3
  camera: Vector3
  wasDefault?: boolean
}

export type NonEmptyCoordinateDefinitionArray = [CoordinateDefinition, ...CoordinateDefinition[]]
export type NonEmptyCoordinateArray = [Coordinate, ...Coordinate[]]
