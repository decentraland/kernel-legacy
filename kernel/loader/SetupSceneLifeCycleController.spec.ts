import { ParcelSightController } from './ParcelSightController'
import { SceneLifeCycleController } from './SceneLifeCycleController'
import { SetupFakeDownloader } from './SetupFakeDownloader.spec'

export function SetupSceneLifeCycleController(parcel?: ParcelSightController) {
  const downloadKit = SetupFakeDownloader()
  const { emitter, downloader, resolvePosition, resolveSceneId } = downloadKit
  const fakeDownload = downloader
  const parcelConfig = !!parcel
  if (!parcelConfig) {
    parcel = new ParcelSightController({ lineOfSightRadius: 1 })
  }
  const scene = new SceneLifeCycleController(fakeDownload, parcel)
  const setPosition = (x: number, y: number) => {
    const sights = parcel.reportCurrentPosition({ x, y })
    scene.reportSightedParcels(sights.sighted, sights.lostSight)
  }
  return { ...downloadKit, parcel, scene, emitter, fakeDownload, setPosition, resolvePosition, resolveSceneId }
}
