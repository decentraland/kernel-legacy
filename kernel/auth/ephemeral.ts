import * as secp256k1 from 'secp256k1'

import { sha256 as digest } from '@dcl/utils'

export function getCurrentEpoch(): number {
  return parseInt((Date.now() / 1000).toString(), 10) // GetTime retrieves milliseconds
}

export function getExpirationDate(ttl: number): Date {
  const now = new Date()
  now.setUTCSeconds(now.getUTCSeconds() + ttl)
  return now
}

export interface EphemeralKey {
  key: EcdsaKeyPair
  makeMessageCredentials(params: MessageInput, accessToken: string): Promise<Map<string, string>>
  hasExpired(): boolean
}

export class MessageInput {
  content: Buffer
  url: string
  method: string

  public static fromHttpRequest(method: string, url: string, body: Buffer | null): MessageInput {
    const m = new MessageInput()
    m.content = body
    m.method = method
    m.url = url
    return m
  }

  public static fromMessage(message: Buffer | null): MessageInput {
    const m = new MessageInput()
    m.content = message
    m.method = null
    m.url = null
    return m
  }

  timeBasedHash(timestamp: number): Promise<Buffer> {
    const toHash: Buffer[] = []
    if (this.method != null) toHash.push(Buffer.from(this.method))
    if (this.url != null) toHash.push(Buffer.from(this.url))
    toHash.push(Buffer.from(timestamp.toString()))
    if (this.content !== null) toHash.push(this.content)

    return digest(Buffer.concat(toHash))
  }
}

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

export class EcdsaKeyPair {
  privateKey: Buffer
  publicKey: Buffer

  constructor(privateK: Buffer) {
    this.privateKey = privateK
    this.publicKey = secp256k1.publicKeyCreate(privateK)
  }

  public static generateRandomKey(): EcdsaKeyPair {
    const pvKey = new Buffer(32)
    let retries = 0
    do {
      crypto.getRandomValues(pvKey)
      retries++
    } while (!secp256k1.privateKeyVerify(pvKey) || retries < 10)
    return new EcdsaKeyPair(pvKey)
  }

  public privateKeyAsHexString(): string {
    return this.privateKey.toString('hex')
  }

  public publicKeyAsHexString(): string {
    return this.publicKey.toString('hex')
  }
}
