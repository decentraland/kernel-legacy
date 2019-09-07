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
        : crypto.subtle.digest('SHA-256', str2ab((data as any) as string))
    return hash
  } else {
    throw new Error('Incompatible argument: could not SHA256')
  }
}

// https://developers.google.com/web/updates/2012/06/How-to-convert-ArrayBuffer-to-and-from-String
function str2ab(str: string) {
  var buf = new ArrayBuffer(str.length * 2) // 2 bytes for each char
  var bufView = new Uint16Array(buf)
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i)
  }
  return buf
}
