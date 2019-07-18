import { getConfiguration } from '../config/env'

const API_URL = getConfiguration('AUTH_API_URL')

export function createHeaders(idToken: string) {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${idToken}`
  }
  return headers
}

async function request(path: string, params: object): Promise<object> {
  const url = API_URL + path
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