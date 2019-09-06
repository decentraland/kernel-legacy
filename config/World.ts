export const NETWORK_HZ = 10

export const AUTH = {
  AUTH0_CLIENT_ID: 'yqFiSmQsxk3LK46JOIB4NJ3wK4HzZVxG',
  AUTH0_DOMAIN: 'decentraland.auth0.com',
  AUTH0_REDIRECT: 'http://localhost:3000/',
  AUTH0_AUDIENCE: 'decentraland.org',
  EPHEMERAL_KEY_TTL: 24 * 60 * 60 * 1000
}

const configuration = {
  ...AUTH
}

export function getConfiguration(key: keyof typeof AUTH, defaultValue?: any) {
  return configuration[key] || defaultValue
}
