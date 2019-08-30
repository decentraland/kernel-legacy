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
  assets: AssetDefinition[]
  assetTags: AssetTagDefinition[]
  requiredAssets: AssetDefinition[]
  cannonicalCID: string
  main: string
  referenceSystem: ReferenceSystem
  parcels: NonEmptyCoordinateArray
  baseParcel: Coordinate
  spawnPoints: SpawnPointDefinition[]
  pickSpawnPoint: () => SpawnPointSelection
  title: string
  screenshot: string
}
