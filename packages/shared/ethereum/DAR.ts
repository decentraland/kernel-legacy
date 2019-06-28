import { getServerConfigurations } from '../../config'

export type DARAsset<T> = {
  name: string
  owner: string
  description: string
  image: string
  registry: string
  token_id: string
  uri: string
  files: T[]
  traits: any[]
}

export async function fetchDARAsset<T>(darURL: string): Promise<DARAsset<T>> {
  const { registry, asset } = parseProtocolUrl(darURL)
  const req = await fetch(`${getServerConfigurations().darApi}/${registry}/asset/${asset}`)
  return req.json()
}

function parseProtocolUrl(url: string): { protocol: string; registry: string; asset: string } {
  const parsedUrl = /([^:]+):\/\/([^/]+)(?:\/(.+))?/.exec(url)

  if (!parsedUrl) {
    throw new Error('The provided URL is not valid: ' + url)
  }

  const result = {
    asset: parsedUrl[3],
    registry: parsedUrl[2],
    protocol: parsedUrl[1]
  }

  if (result.protocol.endsWith(':')) {
    result.protocol = result.protocol.replace(/:$/, '')
  }

  if (result.protocol !== 'ethereum') {
    throw new Error('Invalid protocol: ' + result.protocol)
  }

  return result
}
