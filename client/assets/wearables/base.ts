import { jsonFetch } from '@dcl/utils'

export function getBaseWearables() {
  return jsonFetch('https://avatar-assets.now.sh')
}
