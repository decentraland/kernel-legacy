const qs = require('querystring')
declare var location: any

export function getPositionFromUrl() {
  const searchParams = qs.parse(location.search)
  let x = 0,
    y = 0
  if (searchParams['position']) {
    ;[x, y] = searchParams['position'].split(',').map(_ => parseInt(_, 10))
  } else if (searchParams['x'] && searchParams['y']) {
    x = parseInt(searchParams['x'], 10)
    y = parseInt(searchParams['y'], 10)
  }
  return { x, y }
}
