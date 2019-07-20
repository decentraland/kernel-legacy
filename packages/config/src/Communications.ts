export const Communications = {
  debug: true,
  commRadius: 4,

  peerTtlMs: 60000,

  maxVisiblePeers: 25,

  ephemeralKeyTTL: 60 * 60 * 2,

  iceServers: [
    {
      urls: 'stun:stun.l.google.com:19302'
    },
    {
      urls: 'turn:184.73.100.50:3478',
      credential: 'passworddcl',
      username: 'usernamedcl'
    }
  ]
}

export const PUBLIC_KEY_SOURCE = 'https://auth.decentraland.org/api/v1/public_key'
export const PINNED_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEd/4dLW7Q0Ik4sp4lKwLNofhgZqvA
piXr3KibX8Hch8SNmzJZgFsGgQYsS7MAv40owSiL2k6a5bsQ4102Kw++Pw==
-----END PUBLIC KEY-----`
