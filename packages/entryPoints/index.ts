import 'engine'
import * as qs from 'query-string'

import { ETHEREUM_NETWORK, DEBUG } from '../config'
import { initBabylonClient } from '../dcl'
import { domReadyFuture, bodyReadyFuture } from '../engine/renderer/init'
import { initShared } from '../shared'
import { enableParcelSceneLoading } from '../shared/world/parcelSceneManager'
import { WebGLParcelScene } from '../dcl/WebGLParcelScene'
import { enableMiniMap } from '../dcl/widgets/minimap'
import { movePlayerToSpawnpoint, teleportObservable } from '../shared/world/positionThings'

export async function loadClient(net: ETHEREUM_NETWORK) {
  await initBabylonClient()
  document.body.appendChild(enableMiniMap())

  let initialized = false
  let spawnpointLand = qs.parse(location.search).position

  teleportObservable.add(position => {
    initialized = false
    spawnpointLand = `${position.x},${position.y}`
  })

  await enableParcelSceneLoading(net, {
    parcelSceneClass: WebGLParcelScene,
    onLoadParcelScenes: lands => {
      if (initialized) {
        return
      }

      const land = lands.find(land => land.scene.scene.base === spawnpointLand)

      if (!land) {
        return
      }

      movePlayerToSpawnpoint(land)
      initialized = true
    },
    shouldLoadParcelScene: () => true
  })

  document.body.classList.remove('dcl-loading')
}

bodyReadyFuture
  .then(async body => {
    const { net } = await initShared()

    await loadClient(net)

    // Warn in case wallet is set in mainnet
    if (net === ETHEREUM_NETWORK.MAINNET && DEBUG) {
      const style = document.createElement('style') as HTMLStyleElement
      style.appendChild(
        document.createTextNode(
          `body:before{content:'You are using Mainnet Ethereum Network, real transactions are going to be made.';background:#ff0044;color:#fff;text-align:center;text-transform:uppercase;height:24px;width:100%;position:fixed;padding-top:2px}#main-canvas{padding-top:24px};`
        )
      )
      document.head.appendChild(style)
    }

    domReadyFuture.then(canvas => {
      body.appendChild(canvas)
    })
  })
  .catch(error => {
    document.body.classList.remove('dcl-loading')
    document.body.innerHTML = `<h3>${error.message}</h3>`
  })
