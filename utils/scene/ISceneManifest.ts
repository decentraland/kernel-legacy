import {
  AssetDefinition,
  AssetTagDefinition,
  ReferenceSystem,
  NonEmptyCoordinateArray,
  Coordinate,
  SpawnPointSelection,
  SpawnPointDefinition
} from './SceneManifestTypes'

export interface ISceneManifest {
  version: number
  id: string
  assets: AssetDefinition[]
  legacyMappings: { file: string; hash: string }[]
  assetTags: AssetTagDefinition[]
  requiredAssets: AssetDefinition[]
  cannonicalCID: string
  main: string
  referenceSystem: ReferenceSystem
  parcels: NonEmptyCoordinateArray
  positionStrings: string[]
  baseParcel: Coordinate
  spawnPoints: SpawnPointDefinition[]
  pickSpawnPoint: () => SpawnPointSelection
  title: string
  screenshot: string
}
