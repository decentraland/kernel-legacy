import { Observable } from '../decentraland-ecs/src/ecs/Observable'
import { PointerEvent } from '../decentraland-ecs/src/decentraland/Types'
import { parcelSceneWorker, getSceneWorkerBySceneID } from './world/parcelSceneManager'

export const pointerUpObservable = new Observable<Readonly<PointerEvent>>()
export const pointerDownObservable = new Observable<Readonly<PointerEvent>>()

export function registerPointerEvents(preview: boolean) {
  pointerUpObservable.add(async event => {
    const currentSceneId = preview ? 'previewScene' : parcelSceneWorker && (await parcelSceneWorker.getCurrentScene())
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
    const currentSceneId = preview ? 'previewScene' : parcelSceneWorker && (await parcelSceneWorker.getCurrentScene())
    if (!currentSceneId) {
      return
    }
    const worker = getSceneWorkerBySceneID(currentSceneId)
    if (!worker) {
      return
    }
    worker.dispatchPointerDown(event)
  })
}
