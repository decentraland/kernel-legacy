export const NETWORK_HZ = 10

export const AUTH = {
  AUTH0_CLIENT_ID: 'x8GUwBhYIE3t3YkjIzMmGmNK7KEd7KTI',
  AUTH0_DOMAIN: 'dcl-test.auth0.com',
  AUTH0_REDIRECT: 'http://localhost:3000/callback'
}

const configuration = {
  ...AUTH
}

export function getConfiguration(key: keyof typeof AUTH, defaultValue?: any) {
  return configuration[key] || defaultValue
}
