import { INITIAL_SCENE_LIFECYCLE_STATUS, sceneLifeCycleReducer } from './reducer'
import { rendererSentLoaded, sceneLoading, sceneRunning, sceneScriptError, scriptSentAwake } from './actions'

describe('simple reducer for scene lifecycle', () => {
  it('works as expected', () => {
    let state = INITIAL_SCENE_LIFECYCLE_STATUS
    state = sceneLifeCycleReducer(state, sceneRunning('A'))
    expect(state.running['A']).toBeTruthy()
    state = sceneLifeCycleReducer(state, sceneScriptError('A'))
    expect(state.running['A']).toBeFalsy()
    expect(state.error['A']).toBeTruthy()
    state = sceneLifeCycleReducer(state, sceneLoading('B'))
    expect(state.loading['B']).toBeTruthy()
    state = sceneLifeCycleReducer(state, scriptSentAwake('B'))
    expect(state.loading['B']).toBeFalsy()
    expect(state.awake['B']).toBeTruthy()
    state = sceneLifeCycleReducer(state, rendererSentLoaded('B'))
    expect(state.awake['B']).toBeFalsy()
    expect(state.started['B']).toBeTruthy()
    state = sceneLifeCycleReducer(state, sceneRunning('B'))
    expect(state.awake['B']).toBeFalsy()
    expect(state.started['B']).toBeFalsy()
    expect(state.running['B']).toBeTruthy()
  })
})
