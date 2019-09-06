import * as secp256k1 from 'secp256k1'

import { EcdsaKeyPair } from './EcdsaKeyPair'
import { MessageInput } from './MessageInput'
import { getCurrentEpoch } from './getCurrentEpoch'
import { getExpirationDate } from './getExpirationDate'
import { EphemeralKey } from './EphemeralKey'

export class BasicEphemeralKey implements EphemeralKey {
  key: EcdsaKeyPair
  expirationDate: Date

  constructor(key: EcdsaKeyPair, expirationDate: Date) {
    this.key = key
    this.expirationDate = expirationDate
  }

  /**
   * Generates a new Key
   * @param ttl Time to live in seconds before the expires
   */
  public static generateNewKey(ttl: number): BasicEphemeralKey {
    const keys = EcdsaKeyPair.generateRandomKey()
    const expDate = getExpirationDate(ttl)
    return new BasicEphemeralKey(keys, expDate)
  }

  async makeMessageCredentials(params: MessageInput, accessToken: string): Promise<Map<string, string>> {
    const credentials = new Map<string, string>()
    const timestamp = getCurrentEpoch()
    const signature = this.sign(await params.timeBasedHash(timestamp))
    credentials.set('x-signature', signature)
    credentials.set('x-timestamp', timestamp.toString())
    credentials.set('x-identity', this.getIdentity())
    credentials.set('x-auth-type', 'third-party')
    credentials.set('x-access-token', accessToken)
    return credentials
  }

  hasExpired(): boolean {
    const now = Date.now()
    return now > +this.expirationDate.getTime()
  }

  sign(hash: Buffer | ArrayBuffer): string {
    const value = Buffer.isBuffer(hash) ? hash : Buffer.from(hash)
    return secp256k1.sign(value, this.key.privateKey).signature.toString('hex')
  }

  private getIdentity(): string {
    return `public key derived address: ${this.key.publicKeyAsHexString()}`
  }
}
