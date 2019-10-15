// tslint:disable:no-console
import express = require('express')
import WebSocket = require('ws')
import http = require('http')

type Event = 'Reset'| 'DeactivateRendering'| 'SetDebug'| 'CreateUIScene'|  ConfigureMinimapHUD, ConfigureAvatarHUD, ConfigureNotificationHUD, SendSceneMessage, LoadParcelScenes, AddWearableToCatalog, Teleport, ActivateRendering, LoadProfile
type Message = {
  type: Event 
  payload?: string
}

const port = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

wss.on('connection', function connection(ws, req) {
  ws.on('message', message => {
    const data: Message = JSON.parse(message as string)

    switch (data.type) {
      case 'Reset':
      case 'SetDebug':
      case 'CreateUIScene':
      case 'ConfigureMinimapHUD':
      case 'ConfigureAvatarHUD':
      case 'ConfigureNotificationHUD':
      case 'SendSceneMessage':
      case 'AddWearableToCatalog':
      case 'RemoveWearablesFromCatalog':
      case 'LoadProfile': {
        // ignore
        break
      }
      case 'LoadParcelScenes': {
        // delay + answer scene ready message
        const sceneId = JSON.parse(data.payload).id
        console.log(`loading parcel ${sceneId}`)
        const response = {
          type: 'ControlEvent',
          payload: JSON.stringify({ eventType: 'SceneReady', payload: { sceneId } })
        }
        setTimeout(() => {
          console.log(`scene ready ${sceneId}`)
          ws.send(JSON.stringify(response))
        }, 200)
        break
      }
      case 'Teleport': {
        // ignore for the time being
        const teleport = JSON.parse(data.payload)
        console.log(`teleporting to ${JSON.stringify(teleport)}`)
        break
      }
      case 'DeactivateRendering': {
        // pause sending positions
        console.log('deactivated rendering')
        break
      }
      case 'ActivateRendering': {
        // resume sending positions + send ack
        console.log('activated rendering')
        const response = {
          type: 'ControlEvent',
          payload: JSON.stringify({ eventType: 'ActivateRenderingACK' })
        }
        ws.send(JSON.stringify(response))
        break
      }
      default: {
        console.log(`Unknown message type ${data.type}`);
       break 
      }
    }
  })

  ws.on('close', () => {
    // closing
  })
})

server.listen(port, () => {
  console.info('==>     Listening on port %s.', port)
})
