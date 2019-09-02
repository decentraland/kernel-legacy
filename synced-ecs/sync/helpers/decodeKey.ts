export function decodeKey(d: string) {
  return {
    _: 'KEY',
    a: 'FROM',
    b: 'TO',
    c: 'EVENT',
    d: 'LOOKUP_ID',
    e: 'SINCE',
    f: 'UNTIL',
    g: 'DATA',
    h: 'AUTHORITY'
  }[d]
}
