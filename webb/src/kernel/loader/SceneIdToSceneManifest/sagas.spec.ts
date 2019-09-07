import { runSaga } from 'redux-saga'
import { SET_POSITION_AS_RESOLVED } from '../PositionToSceneId/actions'
import { fetchMissingSceneManifest } from './sagas'
import { SCENE_BY_ID_REQUEST } from './types'

describe('scene id to mapping resolution sagas', () => {
  it('triggers fetch of manifest', () => {
    const dispatched: any[] = []
    runSaga(
      {
        dispatch: action => dispatched.push(action),
        getState: () => ({ sceneIdToManifest: { loading: {}, errors: {}, scenesById: {} }, positionToSceneId: {} })
      },
      fetchMissingSceneManifest,
      { type: SET_POSITION_AS_RESOLVED, payload: { positions: ['1,1'], sceneId: 'A' } }
    )
    expect(dispatched.length).toBe(1)
    expect(dispatched[0].type).toBe(SCENE_BY_ID_REQUEST)
    expect(dispatched[0].payload).toEqual({ sceneId: 'A' })
  })
  /**
   * Careful here! It looks like our sagas are not catching errors correctly. Must investigate better
   */
  it('run fetch request saga - happy path', () => {})
})
