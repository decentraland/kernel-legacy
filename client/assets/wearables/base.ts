import { jsonFetch } from '@dcl/utils'
import { AvatarAsset } from '@dcl/client/passports/types'

export function getBaseWearables() {
  return jsonFetch('https://avatar-assets.now.sh')
}

export type Catalog = {
  [body_type: string]: {
    [wearable_name: string]: AvatarAsset
  }
}

export async function getBaseCatalog() {
  const assets = await getBaseWearables()
  const result: Catalog = {}
  for (let asset of assets.data) {
    for (let main of asset.main) {
      const type = main.type
      result[type] = result[type] || {}
      result[type][name] = { ...asset, main }
    }
  }
  return result
}
