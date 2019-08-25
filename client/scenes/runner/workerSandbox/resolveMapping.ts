import { dataUrlRE, blobRE } from './constants'

export function resolveMapping(mapping: string | undefined, mappingName: string, baseUrl: string) {
  let url = mappingName
  if (mapping) {
    url = mapping
  }
  if (dataUrlRE.test(url)) {
    return url
  }
  if (blobRE.test(url)) {
    return url
  }
  return (baseUrl.endsWith('/') ? baseUrl : baseUrl + '/') + url
}
