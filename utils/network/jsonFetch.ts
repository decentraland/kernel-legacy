import { future } from 'fp-future'

const requestCache: Map<string, any> = new Map()

export const Fetch = {
  json: jsonFetch
}

/**
 * Fetches a resource and catches the response
 * @param url
 */
export function jsonFetch(url: string): Promise<any> {
  if (requestCache.has(url)) {
    return requestCache.get(url)
  }

  const futureCache = future()

  requestCache.set(url, futureCache)

  fetch(url)
    .then(
      async $ => {
        if (!$.ok) {
          futureCache.reject(new Error('Response not ok - ' + url))
        } else {
          try {
            futureCache.resolve(await $.json())
          } catch (e) {
            console['error']('Error parsing json: ' + url, $)
            futureCache.reject(e)
          }
        }
      },
      e => futureCache.reject(e)
    )
    .catch(e => futureCache.reject(e))

  return futureCache
}
