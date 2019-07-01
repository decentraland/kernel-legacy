declare var window: any

export const performanceConfigurations = [
  { antialiasing: true, downsampling: 0, shadows: true },
  { antialiasing: false, downsampling: 1, shadows: true },
  { antialiasing: false, downsampling: 1, shadows: false },
  { antialiasing: false, downsampling: 1, shadows: true },
  { antialiasing: false, downsampling: 2, shadows: false }
]

export const NETWORK_HZ = 10

export namespace interactionLimits {
  /**
   * click distance, this is the lenght of the ray/lens
   */
  export const clickDistance = 10
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

  export const visibleRadius = 4

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

// Entry points
export const PREVIEW: boolean = !!(global as any).preview
export const EDITOR: boolean = !!(global as any).isEditor

// Development
export const AVOID_WEB3: boolean = !!(global as any).avoidWeb3 || EDITOR
export const DEBUG = location.search.indexOf('DEBUG_MODE') !== -1 || !!(global as any).mocha || PREVIEW || EDITOR
export const USE_LOCAL_COMMS = location.search.indexOf('LOCAL_COMMS') !== -1 || PREVIEW
export const DEBUG_ANALYTICS = location.search.indexOf('DEBUG_ANALYTICS') !== -1
export const DEBUG_MOBILE = location.search.indexOf('DEBUG_MOBILE') !== -1
export const DEBUG_MESSAGES = location.search.indexOf('DEBUG_MESSAGES') !== -1

export const DISABLE_AUTH = location.search.indexOf('DISABLE_AUTH') !== -1 || DEBUG
export const ENGINE_DEBUG_PANEL = location.search.indexOf('ENGINE_DEBUG_PANEL') !== -1
export const SCENE_DEBUG_PANEL = location.search.indexOf('SCENE_DEBUG_PANEL') !== -1 && !ENGINE_DEBUG_PANEL

export namespace commConfigurations {
  export const debug = true
  export const commRadius = 4

  export const peerTtlMs = 1000

  export const maxVisiblePeers = 25

  export const iceServers = [
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

// take address from http://contracts.decentraland.org/addresses.json

export enum ETHEREUM_NETWORK {
  MAINNET = 'mainnet',
  ROPSTEN = 'ropsten'
}

export let decentralandConfigurations: any = {}
let contracts: any = null
let network: ETHEREUM_NETWORK | null = null

export function getTLD() {
  if (window) {
    return window.location.hostname.match(/(\w+)$/)[0]
  }
}

export const knownTLDs = ['zone', 'org', 'today']

function getDefaultTLD() {
  const TLD = getTLD()
  if (!TLD || !knownTLDs.includes(TLD)) {
    return network === ETHEREUM_NETWORK.ROPSTEN ? 'zone' : 'org'
  }
  return TLD
}

export function getServerConfigurations() {
  const TLDDefault = getDefaultTLD()
  return {
    landApi: `https://api.decentraland.${TLDDefault}/v1`,
    content: `https://content.decentraland.${TLDDefault}`,
    worldInstanceUrl: `wss://world-comm.decentraland.${TLDDefault}/connect`,
    darApi:
      TLDDefault === 'zone' || TLDDefault === 'today'
        ? 'https://schema-api-v2.now.sh/dar'
        : 'https://schema.decentraland.org/dar'
  }
}

export async function setNetwork(net: ETHEREUM_NETWORK) {
  const response = await fetch('https://contracts.decentraland.org/addresses.json')
  const json = await response.json()

  network = net
  contracts = json[net]

  decentralandConfigurations = {
    contractAddress: contracts.LANDProxy,
    contracts: {
      serviceLocator: contracts.ServiceLocator
    },
    paymentTokens: {
      MANA: contracts.MANAToken
    },
    invite: contracts.DecentralandInvite
  }
}

export namespace ethereumConfigurations {
  export const mainnet = {
    wss: 'wss://mainnet.infura.io/ws',
    http: 'https://mainnet.infura.io/',
    etherscan: 'https://etherscan.io'
  }
  export const ropsten = {
    wss: 'wss://ropsten.infura.io/ws',
    http: 'https://ropsten.infura.io/',
    etherscan: 'https://ropsten.etherscan.io'
  }
}

export const isRunningTest: boolean = (global as any)['isRunningTests'] === true
