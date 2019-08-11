export const NETWORK_HZ = 10

export const AUTH = {
  AUTH0_CLIENT_ID: 'yqFiSmQsxk3LK46JOIB4NJ3wK4HzZVxG',
  AUTH0_DOMAIN: 'decentraland.auth0.com',
  AUTH0_REDIRECT: 'http://localhost:3000/callback'
}

const configuration = {
  ...AUTH
}

export function getConfiguration(key: keyof typeof AUTH, defaultValue?: any) {
  return configuration[key] || defaultValue
}
