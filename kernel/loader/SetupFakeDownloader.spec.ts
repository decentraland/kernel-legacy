import future from 'fp-future'
import { buildFakeSceneBasedOnParcels } from './buildFakeSceneBasedOnParcels'
import { EventEmitter } from 'events'

export function SetupFakeDownloader() {
  const pendingRequests = {
    pos: 0,
    scene: 0
  }
  const promisesToReturn: any = {}
  const promisesToResolve: any = {}
  const downloader: any = {
    resolvePositionToSceneId: (pos: string) => {
      // console.log(`Requested position ${pos} -- it existed: ${!!promisesToReturn[pos]}`)
      if (promisesToReturn[pos]) {
        return promisesToReturn[pos]
      }
      promisesToReturn[pos] = future<string>()
      promisesToResolve[pos] = future<string>()
      promisesToResolve[pos].then((solution: string) => {
        // console.log(`Resolving position ${pos} -- it existed: ${!!promisesToReturn[pos]}. Solution: ${solution}`)
        return promisesToReturn[pos].resolve(solution)
      })
      emitter.emit('pos-request', pos)
      return promisesToReturn[pos]
    },
    getSceneDataForSceneId: (sceneId: string) => {
      if (!sceneId || typeof sceneId !== 'string') {
        try {
          throw new Error()
        } catch (stack) {
          console.log(`Requested undefined at: ${stack.stack}`)
        }
      }
      // console.log(`Requested scene ${sceneId} -- it existed: ${!!promisesToReturn[sceneId]}`)
      if (promisesToReturn[sceneId]) {
        return promisesToReturn[sceneId]
      }
      promisesToReturn[sceneId] = future<string>()
      promisesToResolve[sceneId] = future<string>()
      promisesToResolve[sceneId].then((solution: string) => promisesToReturn[sceneId].resolve(solution))
      emitter.emit('scene-request', sceneId)
      return promisesToReturn[sceneId]
    }
  }
  const emitter = new EventEmitter()
  const resolvePosition = (x: number, y: number, sceneId: string) => {
    if (!promisesToResolve[`${x},${y}`]) {
      try {
        throw new Error()
      } catch (stack) {
        console.log(`Info: tried to resolve position ${x},${y} which was not requested -- ${stack.stack}`)
        return
      }
    }
    if (typeof sceneId !== 'string') {
      try {
        throw new Error()
      } catch (stack) {
        console.log(`Info: tried to resolve position ${x},${y} with an object ${sceneId}`, stack.stack)
        return
      }
    }
    promisesToResolve[`${x},${y}`].resolve(sceneId)
  }
  const resolveSceneId = (sceneId: string, parcels: string[]) => {
    if (!promisesToResolve[sceneId]) {
      try {
        throw new Error()
      } catch (stack) {
        console.log(`Info: tried to resolve sceneId ${sceneId}, which was not requested -- ${stack.stack}`)
        return
      }
    }
    promisesToResolve[sceneId].resolve(buildFakeSceneBasedOnParcels(sceneId, parcels))
  }
  const registerPositionResolver = (resolver: (_: string) => string) => {
    emitter.on('pos-request', (pos: string) => promisesToReturn[pos].resolve(resolver(pos)))
  }
  const registerSceneResolver = (resolver: (_: string) => any) => {
    emitter.on('scene-request', (sceneId: string) => promisesToReturn[sceneId].resolve(resolver(sceneId)))
  }
  return {
    downloader,
    pendingRequests,
    emitter,
    resolvePosition,
    resolveSceneId,
    registerPositionResolver,
    registerSceneResolver
  }
}
