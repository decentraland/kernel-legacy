import { Auth } from 'decentraland-auth'

import './apis/index'
import './events'

import {
  ETHEREUM_NETWORK,
  DEBUG_MOBILE,
  PREVIEW,
  EDITOR,
  AVOID_WEB3,
  setNetwork,
  decentralandConfigurations,
  getTLD
} from 'config'
import { info, error } from 'engine/logger'
import { initializeUrlPositionObserver } from './world/positionThings'
import { getERC721 } from './ethereum/ERC721'
import { getUserAccount, getNetwork } from './ethereum/EthereumService'
import { connect } from './comms'
import { requestManager, awaitWeb3Approval } from './ethereum/provider'
import { initialize } from './analytics'

// TODO fill with segment keys and integrate identity server
export async function initializeAnalytics() {
  const TLD = getTLD()
  switch (TLD) {
    case 'org':
      return initialize('', { id: 'null', name: 'null', email: 'null' })
    case 'today':
      return initialize('', { id: 'null', name: 'null', email: 'null' })
    case 'zone':
      return initialize('', { id: 'null', name: 'null', email: 'null' })
  }
}

async function grantAccess(address: string | null, net: ETHEREUM_NETWORK) {
  if (DEBUG_MOBILE || PREVIEW || EDITOR || AVOID_WEB3) {
    return true
  }

  let isWhitelisted = location.hostname === 'localhost' || navigator.userAgent.includes('Oculus')

  if (!isWhitelisted && address) {
    const contract = await getERC721(requestManager, decentralandConfigurations.invite)

    const balance = await contract.balanceOf(address)

    isWhitelisted = balance.gt(0)

    if (!isWhitelisted) {
      throw new Error(`Unauthorized ${address} [${net}]`)
    }
  }

  return isWhitelisted
}

function getNetworkFromTLD(): ETHEREUM_NETWORK | null {
  if (getTLD() === 'localhost') {
    return null
  }

  if (getTLD() === 'zone') {
    return ETHEREUM_NETWORK.ROPSTEN
  }

  return ETHEREUM_NETWORK.MAINNET
}

async function getAddressAndNetwork() {
  if (AVOID_WEB3) {
    error('Could not get Ethereum address, communications will be disabled.')

    return {
      net: getNetworkFromTLD() || ETHEREUM_NETWORK.MAINNET,
      address: '0x0000000000000000000000000000000000000000'
    }
  }

  try {
    await awaitWeb3Approval()
    const address = await getUserAccount()
    const web3Network = await getNetwork()
    const web3net = web3Network === '1' ? ETHEREUM_NETWORK.MAINNET : ETHEREUM_NETWORK.ROPSTEN
    const net = getNetworkFromTLD() || web3net

    if (web3net && net !== web3net) {
      // TODO @fmiras show an HTML error if web3 networks differs from domain network and do not load client at all
      error(`Switch to network ${net}`)
    }

    info('Using ETH network: ', net)

    return {
      net,
      address
    }
  } catch (e) {
    error('Could not get Ethereum address, WebRTC will be disabled.')
    info(e)

    return {
      net: getNetworkFromTLD() || ETHEREUM_NETWORK.MAINNET,
      address: '0x0000000000000000000000000000000000000000'
    }
  }
}

async function authenticate(): Promise<void> {
  const auth = new Auth()
  return auth.login()
}

export async function initShared() {
  await authenticate()
  const { address, net } = await getAddressAndNetwork()

  // Load contracts from https://contracts.decentraland.org
  await setNetwork(net)

  // TODO uncomment analytics initialization when identity ready
  // tslint:disable-next-line: no-commented-out-code
  // await initializeAnalytics()
  const isWhitelisted = await grantAccess(address, net)

  if (isWhitelisted) {
    await connect(
      address,
      net
    )
  } else {
    throw new Error(`The address ${address} is not whitelisted`)
  }

  initializeUrlPositionObserver()

  return {
    net,
    address
  }
}
