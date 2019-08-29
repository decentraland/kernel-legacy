import { ISceneRunningScript } from '../../types/ISceneRunningScript'

const WEB3_PROVIDER = 'web3-provider'
const PROVIDER_METHOD = 'getProvider'

export function generateRPCHostManager(that: ISceneRunningScript) {
  return {
    loadModule: async _moduleName => {
      const moduleToLoad = _moduleName.replace(/^@decentraland\//, '')
      let methods: string[] = []

      if (moduleToLoad === WEB3_PROVIDER) {
        methods.push(PROVIDER_METHOD)
        this.provider = await this.getEthereumProvider()
      } else {
        const proxy = (await this.loadAPIs([moduleToLoad]))[moduleToLoad]

        try {
          methods = await proxy._getExposedMethods()
        } catch (e) {
          throw Object.assign(new Error(`Error getting the methods of ${moduleToLoad}: ` + e.message), {
            original: e
          })
        }
      }

      return {
        rpcHandle: moduleToLoad,
        methods: methods.map(name => ({ name }))
      }
    },

    callRpc: async (rpcHandle: string, methodName: string, args: any[]) => {
      if (rpcHandle === WEB3_PROVIDER && methodName === PROVIDER_METHOD) {
        return this.provider
      }

      const module = this.loadedAPIs[rpcHandle]
      if (!module) {
        throw new Error(`RPCHandle: ${rpcHandle} is not loaded`)
      }
      return module[methodName].apply(module, args)
    },

    log(...args: any[]) {
      that.onLog(...args)
    },

    error(message, data) {
      that.onError(Object.assign(new Error(message), { data }))
    }
  }
}
