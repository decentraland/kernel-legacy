import * as BABYLON from 'babylonjs'

import { vrHelper, scene, engine } from './init'
import { playerConfigurations, visualConfigurations, parcelLimits } from 'config'
import { keyState, Keys } from './input'
import { gridToWorld } from 'atomicHelpers/parcelScenePositions'
import { teleportObservable } from 'shared/world/positionThings'

export const DEFAULT_CAMERA_ZOOM = 32
export const MAX_CAMERA_ZOOM = 100
const CAMERA_SPEED = 0.02
const CAMERA_LEFT = BABYLON.Quaternion.RotationYawPitchRoll(Math.PI / 2, 0, 0)
const CAMERA_RIGHT = BABYLON.Quaternion.RotationYawPitchRoll(-Math.PI / 2, 0, 0)
const CAMERA_FORWARD = BABYLON.Quaternion.RotationYawPitchRoll(Math.PI, 0, 0)
const CAMERA_BACKWARD = BABYLON.Quaternion.RotationYawPitchRoll(0, 0, 0)

const vrCamera = vrHelper.deviceOrientationCamera as BABYLON.DeviceOrientationCamera

const arcCamera = new BABYLON.ArcRotateCamera(
  'arc-camera',
  -Math.PI / 4,
  Math.PI / 3,
  DEFAULT_CAMERA_ZOOM,
  new BABYLON.Vector3(5, 0, 5),
  scene,
  true
)

/// --- SIDE EFFECTS ---

{
  vrCamera.ellipsoid = new BABYLON.Vector3(0.3, playerConfigurations.height / 2, 0.3)
  // Activate collisions
  vrCamera.checkCollisions = true
  // Activate gravity !
  vrCamera.applyGravity = true
  vrCamera.position.y = playerConfigurations.height

  vrCamera.speed = playerConfigurations.speed
  vrCamera.inertia = playerConfigurations.inertia
  vrCamera.angularSensibility = playerConfigurations.angularSensibility

  vrCamera.maxZ = visualConfigurations.far * 1.6
  vrCamera.fov = 0.8
  vrCamera.minZ = visualConfigurations.near

  vrHelper.position = vrCamera.position

  arcCamera.keysDown = []
  arcCamera.keysUp = []
  arcCamera.keysLeft = []
  arcCamera.keysRight = []

  arcCamera.onAfterCheckInputsObservable.add(() => {
    if (arcCamera === scene.activeCamera) {
      if (keyState[Keys.KEY_LEFT]) {
        arcCamera.target.addInPlace(moveCamera(arcCamera, CAMERA_LEFT, CAMERA_SPEED * engine.getDeltaTime()))
      }

      if (keyState[Keys.KEY_RIGHT]) {
        arcCamera.target.addInPlace(moveCamera(arcCamera, CAMERA_RIGHT, CAMERA_SPEED * engine.getDeltaTime()))
      }

      if (keyState[Keys.KEY_UP]) {
        arcCamera.target.addInPlace(moveCamera(arcCamera, CAMERA_FORWARD, CAMERA_SPEED * engine.getDeltaTime()))
      }

      if (keyState[Keys.KEY_DOWN]) {
        arcCamera.target.addInPlace(moveCamera(arcCamera, CAMERA_BACKWARD, CAMERA_SPEED * engine.getDeltaTime()))
      }
    }
  })

  arcCamera.upperBetaLimit = Math.PI / 2
  arcCamera.allowUpsideDown = false
  arcCamera.upperRadiusLimit = arcCamera.panningDistanceLimit = MAX_CAMERA_ZOOM
  arcCamera.pinchPrecision = 150
  arcCamera.wheelPrecision = 150
  arcCamera.lowerRadiusLimit = 5

  setCamera(false)
}

/// --- EXPORTS ---

function applyQuaternion(v: BABYLON.Vector3, q: BABYLON.Quaternion) {
  let x = v.x
  let y = v.y
  let z = v.z
  let qx = q.x
  let qy = q.y
  let qz = q.z
  let qw = q.w

  // calculate quat * vector

  let ix = qw * x + qy * z - qz * y
  let iy = qw * y + qz * x - qx * z
  let iz = qw * z + qx * y - qy * x
  let iw = -qx * x - qy * y - qz * z

  // calculate result * inverse quat

  v.x = ix * qw + iw * -qx + iy * -qz - iz * -qy
  v.y = iy * qw + iw * -qy + iz * -qx - ix * -qz
  v.z = iz * qw + iw * -qz + ix * -qy - iy * -qx

  return v
}

function moveCamera(camera: BABYLON.ArcRotateCamera, directionRotation: BABYLON.Quaternion, speed: number) {
  const direction = camera.position.subtract(camera.target)
  direction.y = 0
  direction.normalize()

  applyQuaternion(direction, directionRotation)
  return direction.scaleInPlace(speed)
}

export { vrCamera, arcCamera }

export function setCamera(thirdPerson: boolean) {
  if (thirdPerson && scene.activeCamera === arcCamera) return
  if (!thirdPerson && scene.activeCamera === vrCamera) return

  if (thirdPerson) {
    arcCamera.target.copyFrom(scene.activeCamera!.position)
    scene.switchActiveCamera(arcCamera)
    scene.cameraToUseForPointers = scene.activeCamera
  } else {
    vrCamera.position.copyFrom(scene.activeCamera!.position)
    scene.switchActiveCamera(vrCamera)
    scene.cameraToUseForPointers = scene.activeCamera
  }
}

export function isThirdPersonCamera() {
  return scene.activeCamera === arcCamera
}

export function setCameraPosition(position: BABYLON.Vector3) {
  if (scene.activeCamera === arcCamera) {
    arcCamera.target.copyFrom(position)
  } else {
    scene.activeCamera!.position.copyFrom(position)
  }
}

export function cameraPositionToRef(ref: BABYLON.Vector3) {
  if (scene.activeCamera === arcCamera) {
    ref.copyFrom(arcCamera.target)
  } else {
    ref.copyFrom(scene.activeCamera!.position)
  }
}

export function rayToGround(screenX: number, screenY: number) {
  const mouseVec = new BABYLON.Vector3(screenX, screenY, 0)
  return unprojectToPlane(mouseVec)
}

function unprojectToPlane(vec: BABYLON.Vector3) {
  const viewport = scene.activeCamera!.viewport.toGlobal(engine.getRenderWidth(), engine.getRenderHeight())

  let onPlane = BABYLON.Vector3.Unproject(
    vec,
    viewport.width,
    viewport.height,
    BABYLON.Matrix.Identity(),
    scene.activeCamera!.getViewMatrix(),
    scene.activeCamera!.getProjectionMatrix()
  )

  let dir = onPlane.subtract(scene.activeCamera!.position).normalize()
  let distance = -scene.activeCamera!.position.y / dir.y
  dir.scaleInPlace(distance)
  onPlane = scene.activeCamera!.position.add(dir)
  return onPlane
}

teleportObservable.add((position: { x: number; y: number }) => {
  return teleportTo(position.x, position.y)
})

export async function teleportTo(x: number, y: number) {
  if (
    !(
      parcelLimits.minLandCoordinateX <= x &&
      x <= parcelLimits.maxLandCoordinateX &&
      parcelLimits.minLandCoordinateY <= y &&
      y <= parcelLimits.maxLandCoordinateY
    )
  ) {
    return false
  }
  // Option A: Load scene description, list teleporting point(s), pick one at random if list, calculate world position and set camera
  // ... not implemented!
  // Option B: Set world position :D
  gridToWorld(x, y, vrCamera.position)
}
