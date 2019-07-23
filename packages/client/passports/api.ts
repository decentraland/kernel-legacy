import { get } from '../auth/api'

export function getStoredPassportForUser(accessToken: string /*, userId: string */) {
  return get(`https://avatars-api.decentraland.today/api/profile`, accessToken)
  // this should actualy be return fetch(`https://avatars-api.decentraland.today/api/profile/${userId}`, createHeaders(accessToken))
}

export function resolveMappingsForStoredProfile(userId: string) {
  return `https://avatars-api.decentraland.today/api/profile`
}
