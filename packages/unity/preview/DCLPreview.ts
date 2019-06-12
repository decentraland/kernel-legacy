// tslint:disable: no-console
import { ETHEREUM_NETWORK, DEBUG, AVOID_WEB3 } from '../../config'
import { UnityGame } from '../types'
import { initializePreview } from './initializePreview'
import DCL from '../DCL'

declare var global: any

/**
 * This is the global-scoped object that Unity executes to send `browserInterface`
 * messages to Explorer
 */
export default class DCLPreview extends DCL {
  constructor(protected gameInstance: UnityGame) {
    super(gameInstance)
  }

  EngineStarted() {
    this.instancedJS = initializePreview(this.gameInstance)
    this.instancedJS.catch(error => {
      document.body.classList.remove('dcl-loading')
      document.body.innerHTML = `<h3>${error.message}</h3>`
    })
  }

  MessageFromEngine(type: string, jsonEncodedMessage: string) {
    if (this.instancedJS) {
      ;(this.instancedJS as ReturnType<typeof initializePreview>)
        .then(({ net, loadPreviewScene }) => {
          // this is set to avoid double loading scenes due queued messages
          let currentlyLoadingScene: Promise<any> | null = null

          global['handleServerMessage'] = function(message: any) {
            if (message.type === 'update') {
              // if a scene is currently loading we do not trigger another load
              if (currentlyLoadingScene) return

              currentlyLoadingScene = loadPreviewScene()

              currentlyLoadingScene
                .then(() => {
                  currentlyLoadingScene = null
                })
                .catch(err => {
                  currentlyLoadingScene = null
                  console.error('Error loading scene')
                  console.error(err)
                })
            }
          }

          // Warn in case wallet is set in mainnet
          if (net === ETHEREUM_NETWORK.MAINNET && DEBUG && !AVOID_WEB3) {
            const style = document.createElement('style')
            style.appendChild(
              document.createTextNode(
                `body:before{content:'You are using Mainnet Ethereum Network, real transactions are going to be made.';background:#ff0044;color:#fff;text-align:center;text-transform:uppercase;height:24px;width:100%;position:fixed;padding-top:2px}#main-canvas{padding-top:24px};`
              )
            )
            document.head.appendChild(style)
          }
        })
        .catch(error => {
          document.body.classList.remove('dcl-loading')
          document.body.innerHTML = `<h3>${error.message}</h3>`
        })
    } else {
      // tslint:disable:no-console
      console.error('Message received without initializing engine', type, jsonEncodedMessage)
    }
  }
}
