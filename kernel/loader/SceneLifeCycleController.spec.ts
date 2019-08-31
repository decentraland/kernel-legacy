import { ParcelSightController } from './ParcelSightController'
import { SceneLifeCycleController } from '@dcl/kernel/loader/SceneLifeCycleController'
import { DeltaParcelSightSeeingReport } from '@dcl/kernel/loader/ParcelSightController'
import { EventEmitter } from 'events'
import future from 'fp-future'

const fiveParcels = ['-1,0', '0,0', '1,0', '0,1', '0,-1']
describe('SceneLifeCycleController', () => {
  function setup() {
    const emitter = new EventEmitter()
    const promises: any = {}
    emitter.on('pos', (pos, sceneId) => promises[pos] && promises[pos].resolve(sceneId))
    emitter.on('scene', (sceneId, sceneData) => promises[sceneId] && promises[sceneId].resolve(sceneData))
    const fakeDownload: any = {
      resolvePositionToSceneId: (pos: string) => {
        const result = future<string>()
        promises[pos] = result
        return result
      },
      getSceneDataForSceneId: (sceneId: string) => {
        const result = future<string>()
        promises[sceneId] = result
        return result
      }
    }
    const parcel = new ParcelSightController({ lineOfSightRadius: 1 })
    const scene = new SceneLifeCycleController(fakeDownload, parcel)
    parcel.on('Parcel.sightChanges', (data: DeltaParcelSightSeeingReport) => {
      scene.reportSightedParcels(data.sighted, data.lostSight)
    })
    const setPosition = (x: number, y: number) => parcel.reportCurrentPosition({ x, y })
    const resolvePosition = (x: number, y: number, sceneId: string) => {
      emitter.emit(`pos`, `${x},${y}`, sceneId)
    }
    const resolveSceneId = (sceneId: string, parcels: string[]) => {
      emitter.emit('scene', sceneId, {
        scene: {
          scene: {
            parcels,
            baseParcel: parcels[0]
          }
        }
      })
    }
    return { parcel, scene, emitter, fakeDownload, setPosition, resolvePosition, resolveSceneId }
  }
  it('initial setup', () => {
    const { scene, setPosition } = setup()
    setPosition(0, 0)
    expect(scene).not.toBeNull()
  })
  it('triggers Parcel.showLoader events', () => {
    const { scene, setPosition } = setup()
    const result: any = {}
    scene.on('Parcel.showLoader', ev => {
      result[ev] = true
    })
    setPosition(0, 0)
    expect(Object.keys(result).sort()).toEqual(fiveParcels.sort())
  })
  it('triggers Parcel.empty', done => {
    const { scene, setPosition, resolvePosition } = setup()
    setPosition(0, 0)
    const result = { count: 0 }
    scene.on('Parcel.empty', () => {
      result.count++
      if (result.count === 3) {
        done()
      }
    })
    resolvePosition(-1, 0, null)
    resolvePosition(0, 0, null)
    resolvePosition(0, -1, null)
  })
  it('triggers Scene.loading', async done => {
    const { resolveSceneId, scene, setPosition, resolvePosition } = setup()
    setPosition(0, 0)
    scene.on('Scene.loading', () => {
      done()
    })
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
    await resolveSceneId('A', fiveParcels)
  })
  it('triggers scene.stop', async done => {
    const { resolveSceneId, scene, setPosition, resolvePosition } = setup()
    setPosition(0, 0)
    scene.on('Scene.loading', () => {
      scene.on('Scene.stop', () => {
        done()
      })
      setPosition(5, 5)
    })
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
    await resolveSceneId('A', fiveParcels)
  })
  it('does not trigger scene.stop', async done => {
    const { resolveSceneId, scene, setPosition, resolvePosition } = setup()
    setPosition(0, 0)
    scene.on('Scene.loading', async () => {
      await setPosition(1, 0)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(true)
      expect(scene.sceneIdToStatus.get('A').canAwake()).toBe(true)
      expect(scene.sceneIdToStatus.get('A').canRun()).toBe(false)
      await setPosition(2, 0)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(true)
      await setPosition(3, 0)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(false)
      expect(scene.sceneIdToStatus.get('A').canAwake()).toBe(false)
      expect(scene.sceneIdToStatus.get('A').isLoading()).toBe(false)
      done()
    })
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
    await resolveSceneId('A', fiveParcels)
  })
  it('hides unloaded parcel when moving', done => {
    const { scene, setPosition } = setup()
    scene.on('Parcel.hideLoader', pos => {
      if (pos === '-1,0') {
        done()
      }
    })
    setPosition(0, 0)
    setPosition(1, 0)
  })
  it('hides loaders on Scene.loading', async () => {
    const { resolveSceneId, scene, setPosition, resolvePosition } = setup()
    setPosition(0, 0)
    const result = { count: 5 }
    scene.on('Parcel.hideLoader', () => {
      result.count--
    })
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
    scene.on('Scene.loading', () => {
      scene.reportSceneFinishedFirstRound('A')
    })
    scene.on('Scene.awake', () => {
      scene.reportSceneRunning('A')
    })
    scene.on('Scene.running', () => {
      expect(result.count).toBe(0)
    })
    await resolveSceneId('A', fiveParcels)
  })
})
