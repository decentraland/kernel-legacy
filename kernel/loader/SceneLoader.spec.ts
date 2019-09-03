import { resolveWithMapOne } from './SetupFakeMapOne.spec'
import { SetupSceneLoaderKit } from './SetupSceneLoader.spec'

describe('SceneLoader behavior', () => {
  it('initial state', async () => {
    const state = SetupSceneLoaderKit()
    expect(state).toBeTruthy()
    const { sceneLoader } = state
    resolveWithMapOne(state)
    sceneLoader.reportCurrentPosition({ x: 1, y: 1 })
    expect(sceneLoader.currentLoadingParcelPositions.sort()).toEqual(['0,1', '1,1', '1,0', '1,2', '2,1'].sort())
    sceneLoader.reportCurrentPosition({ x: 1, y: 2 })
    expect(sceneLoader.currentLoadingParcelPositions.sort()).toEqual(['0,2', '1,3', '1,1', '1,2', '2,2'].sort())
    sceneLoader.reportCurrentPosition({ x: 1, y: 4 })
    sceneLoader.reportCurrentPosition({ x: 1, y: 1 })
    expect(sceneLoader.currentLoadingParcelPositions.sort()).toEqual(['0,1', '1,1', '1,0', '1,2', '2,1'].sort())
    console.log(sceneLoader.currentLoadingScenes)
  })
})
