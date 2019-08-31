import { RPCSendableMessage } from '@dcl/utils'

export interface IEthereumController {
  send: Function
  sendAsync: Function
}

/**
 * Get a standard ethereum provider
 * Please notice this is highly experimental and might change in the future.
 *
 * method whitelist = [
 *   'eth_sendTransaction',
 *   'eth_getTransactionReceipt',
 *   'eth_estimateGas',
 *   'eth_call',
 *   'eth_getBalance',
 *   'eth_getStorageAt',
 *   'eth_blockNumber',
 *   'eth_getBlockByNumber',
 *   'eth_gasPrice',
 *   'eth_protocolVersion',
 *   'net_version',
 *   'web3_sha3',
 *   'web3_clientVersion',
 *   'eth_getTransactionCount'
 * ]
 */
export async function getEthereumProvider(loader: (names: string[]) => Promise<{ [key: string]: any }>) {
  const { EthereumController } = await loader(['EthereumController'])

  return {
    // @internal
    send(message: RPCSendableMessage, callback?: (error: Error | null, result?: any) => void): void {
      if (message && callback && callback instanceof Function) {
        EthereumController.sendAsync(message)
          .then((x: any) => callback(null, x))
          .catch(callback)
      } else {
        throw new Error('Decentraland provider only allows async calls')
      }
    },
    sendAsync(message: RPCSendableMessage, callback: (error: Error | null, result?: any) => void): void {
      EthereumController.sendAsync(message)
        .then((x: any) => callback(null, x))
        .catch(callback)
    }
  } as {
    send: Function
    sendAsync: Function
  }
}
