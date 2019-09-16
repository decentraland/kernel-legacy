import { expectSaga } from 'redux-saga-test-plan'
import { select } from 'redux-saga/effects'
import { getSightedScenesRunningReport, isSceneAtPositionRendereable } from '../../scene-runner/selectors'
import { setPosition } from '../../userLocation/ParcelSight/actions'
import { settlePosition, teleport, unsettlePosition } from './actions'
import { handleTeleport, tryToSettle } from './sagas'
import { isPositionSettled } from './selectors'

describe('position settlement saga', () => {
  it('do settle if running', async () => {
    await expectSaga(tryToSettle)
      .provide([
        [select(isPositionSettled), false],
        [select(getSightedScenesRunningReport), { '1,1': 'running' }],
      ])
      .put(settlePosition())
      .run()
  })
  it('do not settle if not running', async () => {
    await expectSaga(tryToSettle)
      .provide([
        [select(isPositionSettled), false],
        [select(getSightedScenesRunningReport), { '1,1': '' }],
      ])
      .not.put(settlePosition())
      .run()
  })
  it('handles teleport gracefully if teleporting to running scene: dont trigger unsettle', async () => {
    await expectSaga(handleTeleport, teleport('1,1'))
      .provide([
        [select(isSceneAtPositionRendereable, '1,1'), true],
        [select(isPositionSettled), true]
      ])
      .not.put(unsettlePosition())
      .put(setPosition({ x: 1, y: 1 }))
      .run()
  })
  it('handles teleport gracefully: triggers unsettle if it was settled before', async () => {
    await expectSaga(handleTeleport, teleport('1,1'))
      .provide([
        [select(isSceneAtPositionRendereable, '1,1'), false],
        [select(isPositionSettled), true]
      ])
      .put(unsettlePosition())
      .put(setPosition({ x: 1, y: 1 }))
      .run()
  })
})
