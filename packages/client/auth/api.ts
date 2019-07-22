import { MessageInput, EphemeralKey, BasicEphemeralKey } from 'decentraland-auth-protocol'
import { Communications } from '@dcl/config'
import { AuthData } from 'comms/proto/comms'

export function createHeaders(idToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`
  }
  return headers
}

export async function getMessageCredentials(
  accessToken: string,
  message: string | null,
  previousEphemeral: EphemeralKey
) {
  const msg = message === null ? null : Buffer.from(message)
  const input = MessageInput.fromMessage(msg)

  const ephemeralKey = previousEphemeral
    ? previousEphemeral
    : BasicEphemeralKey.generateNewKey(Communications.ephemeralKeyTTL)
  const credentials = ephemeralKey.makeMessageCredentials(input, accessToken) as any
  let result: Record<string, string> = {}

  for (const [key, value] of credentials.entries()) {
    result[key] = value
  }

  return result
}

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

export async function post(path: string, idToken: string, body: object = {}): Promise<object> {
  const headers = createHeaders(idToken)
  const params = {
    headers,
    method: 'POST',
    body: JSON.stringify(body)
  }
  return request(path, params)
}
