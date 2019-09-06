import * as secp256k1 from 'secp256k1'

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
