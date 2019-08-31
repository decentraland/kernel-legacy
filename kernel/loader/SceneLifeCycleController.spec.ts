import { ParcelSightController } from './ParcelSightController'
import { SceneLifeCycleController } from '@dcl/kernel/loader/SceneLifeCycleController'
import { DeltaParcelSightSeeingReport } from '@dcl/kernel/loader/ParcelSightController'
import { EventEmitter } from 'events'
import future from 'fp-future'

describe('SceneLifeCycleController', () => {
  function setup() {
    const emitter = new EventEmitter()
    const fakeDownload: any = {
      resolvePositionToSceneId: (pos: string) => {
        const result = future<string>()
        emitter.once('resolve', data => result.resolve(data))
        return result
      }
    }
    const parcel = new ParcelSightController({ lineOfSightRadius: 1 })
    const scene = new SceneLifeCycleController(fakeDownload, parcel)
    parcel.on('Parcel.sightChanges', (data: DeltaParcelSightSeeingReport) => {
      scene.reportSightedParcels(data.sighted, data.lostSight)
    })
    const setPosition = (x: number, y: number) => parcel.reportCurrentPosition({ x, y })
    return { parcel, scene, fakeDownload, setPosition }
  }
  it('works', () => {
    const { scene, setPosition } = setup()
    setPosition(0, 0)
    expect(scene).not.toBeNull()
  })
})
