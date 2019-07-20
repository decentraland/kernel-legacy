import { MessageInput } from 'decentraland-auth-protocol'

export function createHeaders(idToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`
  }
  return headers
}

export async function legacyGetMessageCredentials(message: string | null) {
  const msg = message === null ? null : Buffer.from(message)
  const input = MessageInput.fromMessage(msg)
  const accessToken = await this.getAccessToken()

  const credentials = this.getEphemeralKey().makeMessageCredentials(input, accessToken)

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
