export function decodeType(d: string) {
  return {
    p: 'PRESENCE',
    b: 'QUERY_PRESENCE',
    z: 'AUTHORITY_QUERY',
    y: 'AUTHORITY_ANNOUNCEMENT',
    u: 'UUID_EVENT',
    r: 'REQUEST_SNAPSHOT',
    s: 'SNAPSHOT',
    d: 'REQUEST_DELTA',
    t: 'TRY_SNAPSHOT',
    e: 'DELTA'
  }[d]
}
