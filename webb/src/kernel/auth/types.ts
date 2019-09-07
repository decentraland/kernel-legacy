import { EphemeralKey } from "./ephemeral"

export type AuthState = {
  loading: string[]
  data: AuthData | null
  commsToken: string | null
  ephemeral: EphemeralKey
  error: string | null
}

export type AuthData = {
  email: string
  sub: string
  idToken: string
  accessToken: string
  expiresAt: number
}
