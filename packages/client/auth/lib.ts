import { promisify } from 'util'
import { WebAuth, Auth0UserProfile } from 'auth0-js'

import { AuthInfo } from './types'
import { getConfiguration } from '@dcl/utils/'

export const webAuth = new WebAuth({
  clientID: getConfiguration('AUTH0_CLIENT_ID'),
  domain: getConfiguration('AUTH0_DOMAIN'),
  redirectUri: getConfiguration('AUTH0_REDIRECT'),
  responseType: 'token',
  scope: 'openid email'
})

export async function getCode(email: string): Promise<void> {
  const start = promisify(webAuth.passwordlessStart as Function)
  return await start({
    connection: 'email',
    send: 'code',
    email
  })
}

export async function doAuth(email: string, verificationCode: string) {
  const start = promisify(webAuth.passwordlessLogin as Function)
  const authResult = await start({
    connection: 'email',
    email,
    verificationCode
  })
  if (authResult && authResult.accessToken && authResult.idToken) {
    const getUserInfo = promisify(webAuth.client.userInfo as Function)
    const user: Auth0UserProfile = await getUserInfo(authResult.accessToken)
    return {
      email: user.email!,
      sub: user.sub,
      expiresAt: authResult.expiresIn! * 1000 + new Date().getTime(),
      accessToken: authResult.accessToken!,
      idToken: authResult.idToken!
    } as AuthInfo
  } else {
    throw new Error('Could not login: unexpected result' + JSON.stringify(authResult))
  }
}

export async function renewToken(): Promise<AuthInfo> {
  const check = promisify(webAuth.checkSession) as any
  const authResult = await check({})
  return {
    email: authResult.idTokenPayload.email,
    sub: authResult.idTokenPayload.sub,
    expiresAt: authResult.expiresIn! * 1000 + new Date().getTime(),
    accessToken: authResult.accessToken!,
    idToken: authResult.idToken!
  } as AuthInfo
}

export function logout(): Promise<void> {
  return (promisify(webAuth.logout) as any)({ returnTo: window.location.origin })
}

export function isTokenExpired(expiresAt: number) {
  return expiresAt > 0 && expiresAt < Date.now()
}
