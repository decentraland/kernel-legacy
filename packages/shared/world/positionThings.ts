import { worldToGrid, gridToWorld, parseParcelPosition } from 'atomicHelpers/parcelScenePositions'
import * as qs from 'query-string'
import { ILand } from 'shared/types'
import {
  Vector3,
  ReadOnlyVector3,
  ReadOnlyQuaternion,
  Vector2,
  ReadOnlyVector2
} from 'decentraland-ecs/src/decentraland/math'
import { Observable } from 'decentraland-ecs/src/ecs/Observable'
import { scene } from 'engine/renderer'

export const positionObservable = new Observable<
  Readonly<{
    position: ReadOnlyVector3
    rotation: ReadOnlyVector3
    quaternion: ReadOnlyQuaternion
  }>
>()

export const teleportObservable = new Observable<ReadOnlyVector2>()

export const lastPlayerPosition = new Vector3()

positionObservable.add(event => {
  lastPlayerPosition.copyFrom(event.position)
})

export function initializeUrlPositionObserver() {
  let lastTime: number = performance.now()

  let previousPosition = null
  const gridPosition = Vector2.Zero()

  function updateUrlPosition(cameraVector: ReadOnlyVector3) {
    // Update position in URI every second
    if (performance.now() - lastTime > 1000) {
      worldToGrid(cameraVector, gridPosition)

      const currentPosition = `${gridPosition.x | 0},${gridPosition.y | 0}`

      if (previousPosition !== currentPosition) {
        const stateObj = { position: currentPosition }
        previousPosition = currentPosition

        const q = qs.parse(document.location.search)
        q.position = currentPosition

        history.replaceState(stateObj, 'position', `?${qs.stringify(q)}`)
      }

      lastTime = performance.now()
    }
  }

  positionObservable.add(event => {
    updateUrlPosition(event.position)
  })

  if (lastPlayerPosition.equalsToFloats(0, 0, 0)) {
    // LOAD INITIAL POSITION IF SET TO ZERO
    const query = qs.parse(location.search)

    if (query.position) {
      const parcelCoords = query.position.split(',')
      gridToWorld(parseFloat(parcelCoords[0]), parseFloat(parcelCoords[1]), lastPlayerPosition)
    } else {
      lastPlayerPosition.x = Math.round(Math.random() * 10) - 5
      lastPlayerPosition.z = 0
    }
  }
}

export function movePlayerToSpawnpoint(land: ILand) {
  const spawnpoint = getSpawnpoint(land)

  if (!spawnpoint) {
    return
  }

  const [x, y, z] = spawnpoint.split(',')

  lastPlayerPosition.x += parseFloat(x)
  lastPlayerPosition.y += parseFloat(y)
  lastPlayerPosition.z += parseFloat(z)

  const position: BABYLON.Vector3 = BABYLON.Vector3.Zero()
  const rotation = BABYLON.Vector3.Zero()
  const quaternion = BABYLON.Quaternion.Identity()

  const result = new BABYLON.Vector3(
    scene.activeCamera.position.x + parseFloat(x),
    scene.activeCamera.position.y + parseFloat(y),
    scene.activeCamera.position.z + parseFloat(z)
  )

  scene.activeCamera.position.copyFrom(result)
  position.copyFrom(result)
  positionObservable.notifyObservers({ position, rotation, quaternion })
}

function getSpawnpoint(land: ILand) {
  if (!land.scene && !land.scene['policy']) {
    return
  }

  return land.scene['policy'].teleportPosition
}

export function getLandBase(land: ILand): { x: number; y: number } {
  if (
    land.scene &&
    land.scene.scene &&
    land.scene.scene.base &&
    typeof (land.scene.scene.base as string | void) === 'string'
  ) {
    return parseParcelPosition(land.scene.scene.base)
  } else {
    return parseParcelPosition(land.mappingsResponse.parcel_id)
  }
}
