import { AssetNameAndHash } from './AssetNameAndHash'
export type ResolvedWearable = {
  id: string
  main: string | Record<string, AssetNameAndHash>
  contentMappings: []
}
