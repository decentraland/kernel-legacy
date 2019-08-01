const knownTLDs = new Set(['org', 'today', 'zone'])

function getTLD() {
  return window.location.hostname.match(/(\w+)$/)![0]
}

function isValidTLD(TLD: string) {
  return knownTLDs.has(TLD)
}

export function getAuthURL() {
  const TLD = getTLD()
  return `https://auth.decentraland.${isValidTLD(TLD) ? TLD : 'zone'}/api/v1`
}
