import { MessageInput } from './MessageInput'

export interface EphemeralKey {
  makeMessageCredentials(params: MessageInput, accessToken: string): Promise<Map<string, string>>
  hasExpired(): boolean
}
