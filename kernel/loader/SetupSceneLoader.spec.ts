import { SetupFakeDownloader } from './SetupFakeDownloader.spec'
import { ParcelSightController } from './ParcelSightController'
import { PositionLifeCycleController } from './PositionLifecycleController'
import { SceneLoader } from './SceneLoader'
import { SceneLifeCycleController } from './SceneLifeCycleController'

export function SetupSceneLoaderKit(lineOfSightRadius: number = 1) {
  const fakeDownloadKit = SetupFakeDownloader()
  const parcelsControl = new ParcelSightController({ lineOfSightRadius })
  const sceneControl = new SceneLifeCycleController(fakeDownloadKit.downloader, parcelsControl)
  const positionControl = new PositionLifeCycleController(parcelsControl, sceneControl)
  const sceneLoader = new SceneLoader()
  sceneLoader.setupInjecting({
    downloadManager: fakeDownloadKit.downloader,
    parcelController: parcelsControl,
    sceneController: sceneControl,
    positionController: positionControl
  })
  const finishedLoadingScene = (_: string) => sceneControl.reportSceneFinishedFirstRound(_)
  const startRunningScene = (_: string) => sceneControl.reportSceneRunning(_)
  return {
    ...fakeDownloadKit,
    finishedLoadingScene,
    startRunningScene,
    positionControl,
    sceneControl,
    parcelsControl,
    sceneLoader
  }
}
