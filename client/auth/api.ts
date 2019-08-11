import {
  MessageInput,
  EphemeralKey,
  BasicEphemeralKey
} from 'decentraland-auth-protocol'
import { Communications } from '@dcl/config'

/**
 * Generate headers to send an authenticated request
 * @param authToken the authentication token to be used
 */
export function createHeaders(authToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${authToken}`
  }
  return headers
}

/**
 * Get message credentials to send over the comms server
 *
 * @param accessToken The Auth0 Access Token
 * @param message Message to sign (defaults to the empty string '')
 * @param previousEphemeral Optional, the previous ephemeral key used
 */
export async function getMessageCredentials(
  accessToken: string,
  message?: string,
  previousEphemeral?: EphemeralKey
) {
  const msg = !message ? Buffer.from('') : Buffer.from(message!)
  const input = MessageInput.fromMessage(msg)

  const ephemeralKey = previousEphemeral
    ? previousEphemeral
    : BasicEphemeralKey.generateNewKey(Communications.ephemeralKeyTTL)
  return ephemeralKey.makeMessageCredentials(input, accessToken) as any
}

/**
 * Build an authenticated request
 * @internal used by `get` and `post`
 * @param path the path to request
 * @param params params to the wwg `fetch` function
 */
async function request(path: string, params: object): Promise<object> {
  const url = path
  const response = await fetch(url, params)
  return response.json()
}

export async function get(path: string, idToken: string): Promise<object> {
  const headers = createHeaders(idToken)
  const params = { headers }
  return request(path, params)
}

export async function post(
  path: string,
  idToken: string,
  body: object = {}
): Promise<object> {
  const headers = createHeaders(idToken)
  const params = {
    headers,
    method: 'POST',
    body: JSON.stringify(body)
  }
  return request(path, params)
}
