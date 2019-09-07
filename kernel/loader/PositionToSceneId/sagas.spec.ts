import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { allInSight } from '../ParcelSight/selectors'
import { positionLoadingRequest } from './actions'
import { fetchMissingSceneIdMappings } from './sagas'
import { multipleNeedsResolution } from './selectors'

describe('position to scene id saga', () => {
  it('dispatches on setPosition', () => {
    expectSaga(fetchMissingSceneIdMappings)
      .provide([[select(allInSight), ['1,1']], [select(multipleNeedsResolution, ['1,1']), { '1,1': true }]])
      .put(positionLoadingRequest(['1,1']))
      .run()

    expectSaga(fetchMissingSceneIdMappings)
      .provide([
        [select(allInSight), ['1,1', '2,2']],
        [select(multipleNeedsResolution, ['1,1', '2,2']), { '2,2': true }]
      ])
      .put(positionLoadingRequest(['2,2']))
      .run()
  })
})
