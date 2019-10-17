// tslint:disable:no-console
import express = require('express')
import WebSocket = require('ws')
import http = require('http')

const url = require('url')

type Event =
  | 'Reset'
  | 'DeactivateRendering'
  | 'SetDebug'
  | 'CreateUIScene'
  | 'ConfigureMinimapHUD'
  | 'ConfigureAvatarHUD'
  | 'ConfigureNotificationHUD'
  | 'SendSceneMessage'
  | 'LoadParcelScenes'
  | 'AddWearableToCatalog'
  | 'Teleport'
  | 'ActivateRendering'
  | 'LoadProfile'
  | string

type Message = {
  type: Event
  payload?: string
}

type Movement = Generator

const port = process.env.PORT || 5000

const app = express()

const server = http.createServer(app)
const wss = new WebSocket.Server({ server })

const path = (name: string) => {
  console.log(`path name: ${name}`)
  switch (name) {
    case '/loop':
      return [
        // setHeight(2)
        loop(walkTo(320, 320), walkTo(384, 320), walkTo(384, 384), walkTo(320, 384)),
        logOut()
      ]
    case '/walk':
      return [
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        walkTo(320, 384),
        walkTo(384, 320),
        logOut()
      ]
  }
}

const Sense = {
  POSITIVE: step => (current, target) => {
    if (current === target) {
      return current
    }
    const next = current + step
    return next > target ? target : next
  },
  NEGATIVE: step => (current, target) => {
    if (current === target) {
      return current
    }
    const next = current - step
    return next < target ? target : next
  }
}

function* loop(...moves: Movement[]) {
  while (true) {
    for (const move of moves) {
      // yield* move
    }
  }
}

function* logOut() {
  return { x: 1000, y: 1000, z: 1000 }
}

function* walkTo(x: number, z: number) {
  let position = yield

  const xSense = (x > position.x ? Sense.POSITIVE : Sense.NEGATIVE)(2)
  const zSense = (z > position.z ? Sense.POSITIVE : Sense.NEGATIVE)(2)

  while (position.x !== x || position.z !== z) {
    position = yield { x: xSense(position.x, x), y: position.y, z: zSense(position.z, z) }
  }
}

let connectionCounter = 0

wss.on('connection', function connection(ws, req) {
  const patho = url.parse(req.url, true).pathname

  let currentPosition
  const alias = ++connectionCounter

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
        console.log(`${alias}: loading parcel ${sceneId}`)
        const response = {
          type: 'ControlEvent',
          payload: JSON.stringify({ eventType: 'SceneReady', payload: { sceneId } })
        }
        setTimeout(() => {
          console.log(`${alias}: scene ready ${sceneId}`)
          ws.send(JSON.stringify(response))
        }, 200)
        break
      }
      case 'Teleport': {
        // ignore for the time being
        const teleport = JSON.parse(data.payload)
        currentPosition = teleport
        console.log(`${alias}: teleporting to ${JSON.stringify(teleport)}`)
        break
      }
      case 'DeactivateRendering': {
        // pause sending positions
        console.log(`${alias}: deactivated rendering`)
        break
      }
      case 'ActivateRendering': {
        // resume sending positions + send ack
        console.log(`${alias}: activated rendering`)
        const response = {
          type: 'ControlEvent',
          payload: JSON.stringify({ eventType: 'ActivateRenderingACK' })
        }
        ws.send(JSON.stringify(response))
        resume(currentPosition, path(patho), ws, alias).catch(console.log)
        break
      }
      default: {
        console.log(`${alias}: Unknown message type ${data.type}`)
        break
      }
    }
  })

  ws.on('close', () => {
    // closing
  })
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function resume(position: any, path: any[], ws: WebSocket, alias: number) {
  let current = position

  for (const move of path) {
    let done = false
    while (!done) {
      let next = move.next(current)
      current = next.value || current
      done = next.done

      if (current) {
        const response = {
          type: 'ReportPosition',
          payload: JSON.stringify({ position: current, rotation: { x: 0, y: 0, z: 0, w: 0 }, playerHeight: 2 })
        }
        console.log(`${alias}: report position: ${JSON.stringify(response)}`)
        ws.send(JSON.stringify(response))
      }

      await sleep(200)
    }
  }
}

server.listen(port, () => {
  console.info('==>     Listening on port %s.', port)
})
