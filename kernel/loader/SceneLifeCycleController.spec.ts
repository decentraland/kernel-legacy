import { SetupSceneLifeCycleController } from './SetupSceneLifeCycleController.spec'
import { buildFakeSceneBasedOnParcels } from './buildFakeSceneBasedOnParcels'

const fiveParcels = ['-1,0', '0,0', '1,0', '0,1', '0,-1']

describe('SceneLifeCycleController', () => {
  it('initial setup', () => {
    const { scene, setPosition } = SetupSceneLifeCycleController()
    setPosition(0, 0)
    expect(scene).not.toBeNull()
  })
  it('triggers Parcel.showLoader events', () => {
    const { scene, setPosition } = SetupSceneLifeCycleController()
    const result: any = {}
    scene.on('Parcel.showLoader', ev => {
      result[ev] = true
    })
    setPosition(0, 0)
    expect(Object.keys(result).sort()).toEqual(fiveParcels.sort())
  })
  it('triggers Parcel.empty', async done => {
    const { scene, setPosition, resolvePosition } = SetupSceneLifeCycleController()
    await setPosition(0, 0)
    const result = { count: 0 }
    scene.on('Parcel.empty', () => {
      result.count++
      if (result.count === 3) {
        done()
      }
    })
    await resolvePosition(-1, 0, null)
    await resolvePosition(0, 0, null)
    await resolvePosition(0, -1, null)
  })
  it('triggers Scene.loading', async done => {
    const { resolveSceneId, scene, setPosition, resolvePosition } = SetupSceneLifeCycleController()
    scene.on('Scene.loading', () => {
      done()
    })
    await setPosition(0, 0)
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
    await resolveSceneId('A', fiveParcels)
  })
  it('triggers scene.stop', async done => {
    const { registerSceneResolver, scene, setPosition, resolvePosition } = SetupSceneLifeCycleController()
    registerSceneResolver(sceneId => buildFakeSceneBasedOnParcels(sceneId, fiveParcels))
    scene.on('Scene.loading', () => {
      scene.on('Scene.stop', () => {
        done()
      })
      setPosition(5, 5)
    })
    setPosition(0, 0)
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
  })
  it('does not trigger scene.stop', async done => {
    const { registerSceneResolver, scene, setPosition, resolvePosition } = SetupSceneLifeCycleController()
    registerSceneResolver(sceneId => buildFakeSceneBasedOnParcels(sceneId, fiveParcels))
    setPosition(0, 0)
    resolvePosition(0, 0, 'A')
    resolvePosition(0, 1, 'A')
    resolvePosition(0, -1, 'A')
    resolvePosition(1, 0, 'A')
    resolvePosition(-1, 0, 'A')
    scene.on('Scene.loading', () => {
      console.log(scene.sceneIdToStatus)
      setPosition(1, 0)
      console.log(scene.sceneIdToStatus)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(true)
      expect(scene.sceneIdToStatus.get('A').canAwake()).toBe(true)
      expect(scene.sceneIdToStatus.get('A').canRun()).toBe(false)
      setPosition(2, 0)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(true)
      setPosition(3, 0)
      expect(scene.sceneIdToStatus.get('A').isVisible()).toBe(false)
      expect(scene.sceneIdToStatus.get('A').canAwake()).toBe(false)
      expect(scene.sceneIdToStatus.get('A').isLoading()).toBe(false)
      done()
    })
  })
  it('hides unloaded parcel when moving', done => {
    const { scene, setPosition } = SetupSceneLifeCycleController()
    scene.on('Parcel.hideLoader', pos => {
      if (pos === '-1,0') {
        done()
      }
    })
    setPosition(0, 0)
    setPosition(1, 0)
  })
  it('hides loaders on Scene.loading', async () => {
    const { registerSceneResolver, scene, setPosition, resolvePosition } = SetupSceneLifeCycleController()
    const result = { count: 5 }
    scene.on('Parcel.hideLoader', () => {
      result.count--
    })
    scene.on('Scene.loading', () => {
      scene.reportSceneFinishedFirstRound('A')
    })
    scene.on('Scene.awake', () => {
      scene.reportSceneRunning('A')
    })
    scene.on('Scene.running', () => {
      expect(result.count).toBe(0)
    })
    registerSceneResolver(sceneId => buildFakeSceneBasedOnParcels(sceneId, fiveParcels))
    await setPosition(0, 0)
    await resolvePosition(0, 0, 'A')
    await resolvePosition(0, 1, 'A')
    await resolvePosition(0, -1, 'A')
    await resolvePosition(1, 0, 'A')
    await resolvePosition(-1, 0, 'A')
  })
})
