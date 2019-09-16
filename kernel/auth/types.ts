import { BasicEphemeralKey } from './ephemeral'

export type RootAuthState = { auth: AuthState; loading: any }

export type AuthState = {
  loading: string[]
  data: AuthData | null
  commsToken: string | null
  ephemeral: BasicEphemeralKey
  error: string | null
}

export type AuthData = {
  email: string
  sub: string
  idToken: string
  accessToken: string
  expiresAt: number
}
