import { sha256 as digest } from '../sha256'

export class MessageInput {
  private constructor(public readonly content: Buffer, public readonly url: string, public readonly method: string) {}

  public static fromHttpRequest(method: string, url: string, body: Buffer | null): MessageInput {
    return new MessageInput(body || Buffer.from(''), url, method)
  }

  public static fromMessage(message: Buffer | null): MessageInput {
    return new MessageInput(message || Buffer.from(''), '', '')
  }

  timeBasedHash(timestamp: number): Promise<Buffer> {
    const toHash: Buffer[] = []
    if (this.method !== '') toHash.push(Buffer.from(this.method))
    if (this.url !== '') toHash.push(Buffer.from(this.url))
    toHash.push(Buffer.from(timestamp.toString()))
    if (this.content.length > 0) toHash.push(this.content)
    return digest(Buffer.concat(toHash))
  }
}
