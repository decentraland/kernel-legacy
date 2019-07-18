import { isTokenExpired } from './lib'
import { AuthState } from './types'

export const isAuthenticated = (state: AuthState) => state.isAuthenticated
export const getIdToken = (state: AuthState) => state.idToken
export const getAccessToken = (state: AuthState) => state.accessToken
export const isExpired = (state: AuthState) => isTokenExpired(state.expiresAt!)
export const getEmail = (state: AuthState) => state.email
export const getSub = (state: AuthState) => state.sub
