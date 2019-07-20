import { future } from 'fp-future'
import { WebAuth } from 'auth0-js'

import { getConfiguration } from '@dcl/utils/dist/Parametrization'
import { AuthInfo } from './types'

const webAuth = new WebAuth({
  clientID: getConfiguration('AUTH0_CLIENT_ID'),
  domain: getConfiguration('AUTH0_DOMAIN'),
  redirectUri: getConfiguration('AUTH0_REDIRECT'),
  audience: 'decentraland.org',
  responseType: 'token id_token',
  scope: 'openid email profile'
})

export async function checkSession(): Promise<AuthInfo> {
  const promise = future<AuthInfo>()
  webAuth.checkSession(
    {
      audience: 'decentraland.org'
    },
    (err: any, authResult: any) => {
      if (err) return promise.reject(err)
      try {
        return promise.resolve({
          email: authResult.idTokenPayload.email,
          sub: authResult.idTokenPayload.sub,
          expiresAt: authResult.expiresIn! * 1000 + new Date().getTime(),
          accessToken: authResult.accessToken!,
          idToken: authResult.idToken!
        })
      } catch (e) {
        promise.reject(e)
      }
    }
  )
  return promise
}

export async function getVerificationCode(email: string) {
  const promise = future<void>()
  webAuth.passwordlessStart(
    {
      connection: 'email',
      send: 'code',
      email
    },
    (err: any, res: any) => {
      if (err) return promise.reject(err)
      return promise.resolve(res)
    }
  )
  return promise
}

export async function doAuth(email: string, verificationCode: string): Promise<AuthInfo> {
  const result = future<any>()
  webAuth.passwordlessLogin(
    {
      connection: 'email',
      email,
      verificationCode
    },
    (err, authResult) => {
      if (err) return result.reject(new Error(err as any))
      if (authResult && authResult.accessToken && authResult.idToken) {
        try {
          webAuth.client.userInfo(authResult.accessToken, (err2, user) => {
            if (err2) return result.reject(err2 as any)
            try {
              return result.resolve({
                email: user.email!,
                sub: user.sub,
                expiresAt: authResult.expiresIn! * 1000 + new Date().getTime(),
                accessToken: authResult.accessToken!,
                idToken: authResult.idToken!
              } as AuthInfo)
            } catch (e) {
              return result.reject(e)
            }
          })
        } catch (e) {
          result.reject(e)
        }
      } else {
        return result.reject(new Error('Could not login: unexpected result' + JSON.stringify(authResult)))
      }
    }
  )
  return result
}

export function logout() {
  return webAuth.logout({ returnTo: window.location.origin })
}

export function isTokenExpired(expiresAt: number) {
  return expiresAt > 0 && expiresAt < Date.now()
}
