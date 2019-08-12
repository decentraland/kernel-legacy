export function sha256asString(data: string) {
  const hash = sha256(data)
  const crypto = window.crypto || require('crypto')
  if (crypto.createHash) {
    return hash.toString('hex')
  } else {
    return Array.from(hash)
      .map((b: number) => b.toString(16).padStart(2, '0'))
      .join('')
  }
}

export function sha256(data: string | Buffer | Uint8Array | ArrayBuffer) {
  const crypto = window.crypto || require('crypto')
  if (crypto.createHash) {
    return crypto
      .createHash('sha256')
      .update(data)
      .digest()
  } else if (crypto.subtle) {
    const hash =
      typeof data === 'string'
        ? crypto.subtle.digest('SHA-256', new TextEncoder().encode(data).buffer)
        : Buffer.isBuffer(data)
        ? crypto.subtle.digest('SHA-256', data.buffer)
        : crypto.subtle.digest('SHA-256', data)
    return hash
  } else {
    throw new Error('Incompatible argument: could not SHA256')
  }
}
