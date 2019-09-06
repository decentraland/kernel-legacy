export function getCurrentEpoch(): number {
  return parseInt((Date.now() / 1000).toString(), 10) // GetTime retrieves milliseconds
}
