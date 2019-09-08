import { future } from 'fp-future'

const requestCache: Map<string, any> = new Map()

/**
 * Fetch and memoize the response
 * Usage: memoize('https://my.cool/url')(fetch)
 *
 * @param url
 */
export function memoize(jsonUrl) {
  return function(fetch, options?): Promise<any> {
    if (requestCache.has(jsonUrl)) {
      return requestCache.get(jsonUrl)
    }
    const futureCache = future()

    requestCache.set(jsonUrl, futureCache)

    fetch(jsonUrl, options)
      .then(
        async $ => {
          if (!$.ok) {
            futureCache.reject(new Error('Response not ok - ' + jsonUrl))
          } else {
            try {
              futureCache.resolve(await $.json())
            } catch (e) {
              console['error']('Error parsing json: ' + jsonUrl, $)
              futureCache.reject(e)
            }
          }
        },
        e => futureCache.reject(e)
      )
      .catch(e => futureCache.reject(e))

    return futureCache
  }
}
