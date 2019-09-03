import { ISceneManifest } from '@dcl/utils'
import { SetupFakeDownloader } from './SetupFakeDownloader.spec'
import { buildFakeSceneBasedOnParcels } from './buildFakeSceneBasedOnParcels'

export const MapOne: any = {}
export const FakeSceneMap: Record<string, ISceneManifest> = {}
let initialized = false

// prettier-ignore
const scenesMap = `${''
  }AAAAAA${'\n'
  }AAAAAA${'\n'
  }AAAAAA${'\n'
  }AAAAAA${'\n'
  }AAAAAA${'\n'
  }`

const sceneIdToPosArray: any = {}
const sceneIdToScene: any = {}

export function getSceneWithFakeId(x: number, y: number, sceneId) {
  if (initialized) {
    return FakeSceneMap[x][y]
  }
  const startX = -2
  const startY = -2
  let scenesPerY = scenesMap.split('\n')
  for (let i = 0, y = startY; i < scenesPerY.length; i++, y++) {
    for (let j = 0, x = startX; j < scenesPerY[i].length; j++, x++) {
      const sceneId = scenesPerY[j][i]
      sceneIdToPosArray[sceneId] = sceneIdToPosArray[sceneId] || []
      sceneIdToPosArray[sceneId].push(`${x},${y}`)
    }
  }
  for (let i = 0, y = startY; i < scenesPerY.length; i++, y++) {
    for (let j = 0, x = startX; j < scenesPerY[i].length; j++, x++) {
      const sceneId = scenesPerY[j][i]
      FakeSceneMap[x][y] = buildFakeScene(x, y, sceneId)
      sceneIdToScene[sceneId] = FakeSceneMap[x][y]
    }
  }
  initialized = true
  return FakeSceneMap[x][y]
}

export function buildFakeScene(x: number, y: number, sceneId: string) {
  if (sceneIdToScene[sceneId]) {
    return sceneIdToScene[sceneId]
  }
  const posArray = sceneIdToPosArray[sceneId]
  return buildFakeSceneBasedOnParcels(sceneId, posArray)
}

export function resolveWithMapOne(data: ReturnType<typeof SetupFakeDownloader>) {
  data.registerPositionResolver(pos => {
    const [x, y] = pos.split(',')
    if (!MapOne[x]) return null
    return MapOne[x][y]
  })
  data.registerSceneResolver(scene => {
    return FakeSceneMap[scene]
  })
}
