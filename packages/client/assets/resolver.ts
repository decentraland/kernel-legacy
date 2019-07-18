import { URL } from 'url';

export function fetchAssetDescription(assetURI: string) {
  const url = new URL(assetURI)
  url.protocol
  url.hostname
  url.pathname
}