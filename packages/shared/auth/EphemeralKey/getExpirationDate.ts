export function getExpirationDate(ttl: number): Date {
  const now = new Date()
  now.setUTCSeconds(now.getUTCSeconds() + ttl)
  return now
}
