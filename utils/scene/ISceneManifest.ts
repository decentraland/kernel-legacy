import {
  AssetDefinition,
  AssetTagDefinition,
  ReferenceSystem,
  NonEmptyCoordinateArray,
  SpawnPoint
} from './SceneManifestTypes'

export interface ISceneManifest {
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
