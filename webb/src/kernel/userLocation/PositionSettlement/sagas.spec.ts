import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { allInSight } from '../ParcelSight/selectors'
import { settlePosition, teleport, unsettlePosition } from './actions'
import { handleTeleport, tryToSettle } from './sagas'
import { isPositionSettled } from './selectors'
import { getSceneLifeCycle, getSceneStatusByPosition } from '~/kernel/scene-runner/selectors'

describe('position settlement saga', () => {
  it('dispatches settlements', () => {
    expectSaga(tryToSettle)
      .provide([
        [select(isPositionSettled), false],
        [select(allInSight), ['1,1']],
        [
          select(getSceneLifeCycle),
          {
            running: {},
            error: {}
          }
        ]
      ])
      .not.put(settlePosition())
      .run()
    expectSaga(tryToSettle)
      .provide([
        [select(isPositionSettled), false],
        [select(allInSight), ['1,1']],
        [
          select(getSceneLifeCycle),
          {
            running: { '1,1': 1 },
            error: {}
          }
        ]
      ])
      .put(settlePosition())
      .run()
    expectSaga(tryToSettle)
      .provide([[select(isPositionSettled), true]])
      .not.put(settlePosition())
      .run()
  })
  it('handles teleport gracefully if teleporting to running scene', () => {
    expectSaga(handleTeleport, teleport('1,1'))
      .provide([[select(getSceneStatusByPosition, '1,1'), 'running']])
      .not.put(unsettlePosition())
      .run()
    expectSaga(handleTeleport, teleport('1,1'))
      .provide([[select(getSceneStatusByPosition, '1,1'), 'loading']])
      .put(unsettlePosition())
      .run()
  })
})
