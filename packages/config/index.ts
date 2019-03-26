export const performanceConfigurations = [
  { antialiasing: true, downsampling: 0, shadows: true },
  { antialiasing: false, downsampling: 1, shadows: true },
  { antialiasing: false, downsampling: 1, shadows: false },
  { antialiasing: false, downsampling: 1, shadows: true },
  { antialiasing: false, downsampling: 2, shadows: false }
]

export const NETWORK_HZ = 10

export const playerSphereRadius = 0.4

export namespace interactionLimits {
  /**
   * click distance, this is the lenght of the ray/lens
   */
  export const clickDistance = 10
  /**
   * Scale of the marker on the tip of laser beam from VR controller
   */
  export const markerScale = 0.07
}

export namespace parcelLimits {
  // Maximum numbers for parcelScenes to prevent performance problems
  // Note that more limitations may be added to this with time
  // And we may also measure individual parcelScene performance (as
  // in webgl draw time) and disable parcelScenes based on that too,
  // Performance / anti-ddos work is a fluid area.

  // number of entities
  export const entities = 200

  // Number of faces (per parcel)
  export const triangles = 10000
  export const bodies = 300
  export const textures = 10
  export const materials = 20
  export const height = 20
  export const geometries = 200

  export const parcelSize = 16 /* meters */
  export const halfParcelSize = parcelSize / 2 /* meters */
  export const centimeter = 0.01

  export const visibleRadius = 6

  export const maxX = 3000
  export const maxZ = 3000
  export const minX = -3000
  export const minZ = -3000

  export const maxParcelX = 150
  export const maxParcelZ = 150
  export const minParcelX = -150
  export const minParcelZ = -150

  export const minLandCoordinateX = -150
  export const minLandCoordinateY = -150
  export const maxLandCoordinateX = 150
  export const maxLandCoordinateY = 150
}

export namespace playerConfigurations {
  export const gravity = -0.2
  export const height = 1.6
  export const handFromBodyDistance = 0.5
  // The player speed
  export const speed = 2
  export const runningSpeed = 8
  // The player inertia
  export const inertia = 0.01
  // The mouse sensibility (lower is most sensible)
  export const angularSensibility = 500
}

export namespace visualConfigurations {
  export const fieldOfView = 75
  export const farDistance = parcelLimits.visibleRadius * parcelLimits.parcelSize

  export const near = 0.08
  export const far = farDistance
}

export const PREVIEW: boolean = !!(global as any).preview

export const EDITOR: boolean = !!(global as any).isEditor

export const AVOID_WEB3: boolean = !!(global as any).avoidWeb3 || EDITOR

export const DEBUG = location.search.indexOf('DEBUG') !== -1 || !!(global as any).mocha || PREVIEW || EDITOR
export const MOBILE_DEBUG = location.search.indexOf('MOBILE_DEBUG') !== -1
export const DEBUG_METRICS = location.search.indexOf('DEBUG_METRICS') !== -1

export namespace commConfigurations {
  export const debug = DEBUG_METRICS
  export const commRadius = 4

  export const peerTtlMs = 60 * 1000

  export const maxVisiblePeers = 25

  export const iceServers = [
    {
      urls: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com'
    },
    {
      urls: 'turn:192.158.29.39:3478?transport=udp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    },
    {
      urls: 'turn:192.158.29.39:3478?transport=tcp',
      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
      username: '28224511:1379330808'
    },
    {
      urls: 'turn:turn.bistri.com:80',
      credential: 'homeo',
      username: 'homeo'
    },
    {
      urls: 'turn:turn.anyfirewall.com:443?transport=tcp',
      credential: 'webrtc',
      username: 'webrtc'
    }
  ]
}

export const isStandaloneHeadset = navigator && navigator.userAgent.includes('Oculus')

// take address from http://contracts.decentraland.org/addresses.json

export enum ETHEREUM_NETWORK {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten'
}

export const networkConfigurations = {
  [ETHEREUM_NETWORK.MAINNET]: {
    wss: 'wss://mainnet.infura.io/ws',
    http: 'https://mainnet.infura.io/',
    contractAddress: '0xF87E31492Faf9A91B02Ee0dEAAd50d51d56D5d4d',
    landApi: 'https://api.decentraland.org/v1',
    etherscan: 'https://etherscan.io',

    contracts: {
      serviceLocator: '0x151b11892dd6ab1f91055dcd01d23d03a2c47570'
    },

    paymentTokens: {
      MANA: '0x0F5D2fB29fb7d3CFeE444a200298f468908cC942'
    },

    content: 'https://content.decentraland.org',

    worldInstanceUrl: 'wss://world-comm.decentraland.org/connect?method=noop',

    invite: '0xf886313f213c198458eba7ae9329525e64eb763a'
  },
  [ETHEREUM_NETWORK.ROPSTEN]: {
    wss: 'wss://ropsten.infura.io/ws',
    http: 'https://ropsten.infura.io/',
    contractAddress: '0x7a73483784ab79257bb11b96fd62a2c3ae4fb75b',
    landApi: 'https://api.decentraland.zone/v1',
    etherscan: 'https://ropsten.etherscan.io',

    contracts: {
      serviceLocator: '0xb240b30c12d2a9ea6ba3abbf663d9ae265fbebeb'
    },

    paymentTokens: {
      MANA: '0x2a8fd99c19271f4f04b1b7b9c4f7cf264b626edb'
    },

    content: 'https://content.decentraland.zone',

    worldInstanceUrl: 'wss://world-comm.decentraland.zone/connect?method=noop',

    invite: '0x7557dfa02f3bd7d274851e3f627de2ed2ff390e8'
  }
}

export const isRunningTest: boolean = (global as any)['isRunningTests'] === true

export const ROADS_DISTRICT = 'f77140f9-c7b4-4787-89c9-9fa0e219b079'
