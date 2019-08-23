import { Observable } from '../decentraland-ecs/src/ecs/Observable'
import { PointerEvent } from '../decentraland-ecs/src/decentraland/Types'
import { parcelSceneWorker, getSceneWorkerBySceneID } from './world/parcelSceneManager'

export const pointerUpObservable = new Observable<Readonly<PointerEvent>>()
export const pointerDownObservable = new Observable<Readonly<PointerEvent>>()

pointerUpObservable.add(async event => {
  if (!parcelSceneWorker) {
    return
  }
  const currentSceneId = await parcelSceneWorker.getCurrentScene()
  if (!currentSceneId) {
    return
  }
  const worker = getSceneWorkerBySceneID(currentSceneId)
  if (!worker) {
    return
  }
  worker.dispatchPointerUp(event)
})

pointerDownObservable.add(async event => {
  if (!parcelSceneWorker) {
    return
  }
  const currentSceneId = await parcelSceneWorker.getCurrentScene()
  if (!currentSceneId) {
    return
  }
  const worker = getSceneWorkerBySceneID(currentSceneId)
  if (!worker) {
    return
  }
  worker.dispatchPointerDown(event)
})
