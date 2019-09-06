import { action } from 'typesafe-actions'
import { AuthData } from './types'
import { EphemeralKey } from './ephemeral'

// Logout
export const LOGIN = 'Login'
export const login = (redirectUrl?: string) => action(LOGIN, { redirectUrl })
export type LoginAction = ReturnType<typeof login>

// Logout
export const LOGOUT = 'Logout'
export const logout = () => action(LOGOUT)
export type LogoutAction = ReturnType<typeof logout>

// Auth
export const AUTH_REQUEST = '[Request] Auth'
export const AUTH_SUCCESS = '[Success] Auth'
export const AUTH_FAILURE = '[Failure] Auth'

export const authRequest = () => action(AUTH_REQUEST)
export const authSuccess = (data: AuthData, redirectUrl: string | null) => action(AUTH_SUCCESS, { data, redirectUrl })
export const authFailure = (error: string) => action(AUTH_FAILURE, { error })

export type AuthRequestAction = ReturnType<typeof authRequest>
export type AuthSuccessAction = ReturnType<typeof authSuccess>
export type AuthFailureAction = ReturnType<typeof authFailure>

// Token
export const TOKEN_REQUEST = '[Request] Comms token request'
export const TOKEN_SUCCESS = '[Success] Comms token request'
export const TOKEN_FAILURE = '[Failure] Comms token request'

export const tokenRequest = (ephemeral: EphemeralKey) => action(TOKEN_REQUEST, { ephemeral })
export const tokenSuccess = (commsToken: string) => action(TOKEN_SUCCESS, { commsToken })
export const tokenFailure = (error: string) => action(TOKEN_FAILURE, { error })

export type TokenRequestAction = ReturnType<typeof tokenRequest>
export type TokenSuccessAction = ReturnType<typeof tokenSuccess>
export type TokenFailureAction = ReturnType<typeof tokenFailure>
