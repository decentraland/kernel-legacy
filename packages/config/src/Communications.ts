export const Communications = {
  debug: true,
  commRadius: 4,

  peerTtlMs: 60000,

  maxVisiblePeers: 25,

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
