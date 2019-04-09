// We need to import the custom shaders before creating anything
import * as BABYLON from 'babylonjs'
BABYLON.DebugLayer.InspectorURL = require('url-loader!babylonjs-inspector')

import { TaskQueue } from 'atomicHelpers/taskQueue'
import { isMobile } from 'shared/comms/mobile'

import { error } from '../logger'
import './customShaders'
import { scene, domReadyFuture, canvas, engine, audioEngine, vrHelper } from './init'
import { vrCamera } from './camera'
import './ambientLights'
import { resizeRotationCanvas } from './input'
import { ReadOnlyVector3, ReadOnlyVector2 } from 'decentraland-ecs/src'

const bodyScrollLock = require('body-scroll-lock')
const engineMicroQueue = new TaskQueue()

const defer = Promise.resolve().then.bind(Promise.resolve())
declare var global: any
/**
 * Instance of WebGLRenderer
 */

/// --- SIDE EFFECTS ---

export function initDCL() {
  global['isDCLInitialized'] = true

  {
    // set up task scheduler
    engineMicroQueue.longStacks = false
    let shouldFlushMicroQueue = false
    let shouldFlushTaskQueue = false

    // set up microqueue after render
    engineMicroQueue.requestFlushMicroTaskQueue = () => {
      shouldFlushMicroQueue = true
    }

    // set up macroQueue after microqueue
    engineMicroQueue.requestFlushTaskQueue = () => {
      shouldFlushTaskQueue = true
    }

    scene.onAfterRenderObservable.add(() => {
      if (shouldFlushMicroQueue) {
        engineMicroQueue.flushMicroTaskQueue()
        shouldFlushMicroQueue = false
      }
      if (shouldFlushTaskQueue) {
        defer(async () => engineMicroQueue.flushTaskQueue())
        shouldFlushTaskQueue = false
      }
    })
  }

  global['inspector'] = function() {
    scene.debugLayer.onPropertyChangedObservable =
      scene.debugLayer.onPropertyChangedObservable || new BABYLON.Observable()
    scene.debugLayer.show()
  }

  global['ac'] = function(hex: string) {
    scene.ambientColor = BABYLON.Color3.FromHexString(hex)
  }

  domReadyFuture
    .then(canvas => {
      engineMicroQueue.queueTask(() => {
        if (canvas.parentElement) {
          onWindowResize()

          if (isMobile()) {
            bodyScrollLock.disableBodyScroll(canvas)
            resizeRotationCanvas(canvas)
          }
        }
      })
    })
    .catch(error)

  domReadyFuture.resolve(canvas)

  window.addEventListener(
    'resize',
    () => {
      onWindowResize()
    },
    false
  )

  return canvas
}

/// --- EXPORTS ---

export { vrCamera as camera, domReadyFuture, scene, engine, audioEngine, vrHelper, engineMicroQueue }

export const VRButton: HTMLElement = (vrHelper as any)._btnVR

export function onWindowResize() {
  engine.resize()

  engineMicroQueue.queueTask(() => {
    VRButton.style.top = canvas.offsetTop + canvas.offsetHeight - 70 + 'px'
    VRButton.style.left = canvas.offsetLeft + canvas.offsetWidth - 100 + 'px'
  })
}

/**
 * This function is used by the tests
 */
export function setSize(w: number, h: number) {
  canvas.width = w
  canvas.height = h
  canvas.style.width = `${w}px`
  canvas.style.height = `${h}px`
  engine.setSize(w, h)
  onWindowResize()
}

export function initLocalPlayer(initialPosition?: ReadOnlyVector3, initialRotation?: ReadOnlyVector2) {
  vrCamera.position.x = initialPosition!.x || 0
  vrCamera.position.z = initialPosition!.z || 0

  if (vrHelper.vrDeviceOrientationCamera) {
    vrHelper.vrDeviceOrientationCamera.position.copyFrom(vrCamera.position)
  }

  if (initialRotation) {
    vrCamera.cameraRotation.x = initialRotation.x
    vrCamera.cameraRotation.y = initialRotation.y
  }
}

global['initDCL'] = initDCL
global['isDCLInitialized'] = false
