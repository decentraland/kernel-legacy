import { expectSaga } from 'redux-saga-test-plan'
import { call, select } from 'redux-saga/effects'
import { getAccessToken } from 'shared/auth/selectors'
import { notifyNewInventoryItem, passportRequest, passportSuccess } from 'shared/passports/actions'
import {
  compareInventoriesAndTriggerNotification,
  handleFetchProfile,
  profileServerRequest
} from 'shared/passports/sagas'
import { getProfile, getProfileDownloadServer } from 'shared/passports/selectors'
import { passportSaga, delay } from '../../packages/shared/passports/sagas'
import { getCurrentUserId } from '../../packages/shared/auth/selectors'
import { processServerProfile } from '../../packages/shared/passports/transformations/processServerProfile'
import { dynamic } from 'redux-saga-test-plan/providers'

describe('fetchProfile behavior', () => {
  it('behaves normally', () => {
    const profile = { data: 'profile' }
    return expectSaga(handleFetchProfile, passportRequest('userId'))
      .put(passportSuccess('userId', 'passport' as any))
      .provide([
        [select(getProfileDownloadServer), 'server'],
        [select(getAccessToken), 'access-token'],
        [call(profileServerRequest, 'server', 'userId', 'access-token'), profile],
        [select(getCurrentUserId), 'myid'],
        [call(processServerProfile, 'userId', profile), 'passport']
      ])
      .run()
  })

  it('completes once for more than one request of same user', () => {
    const profile = { data: 'profile' }
    return expectSaga(passportSaga)
      .put(passportSuccess('user|1', 'passport' as any))
      .not.put(passportSuccess('user|1', 'passport' as any))
      .dispatch(passportRequest('user|1'))
      .dispatch(passportRequest('user|1'))
      .dispatch(passportRequest('user|1'))
      .provide([
        [select(getProfileDownloadServer), 'server'],
        [select(getAccessToken), 'access-token'],
        [
          call(profileServerRequest, 'server', 'user|1', 'access-token'),
          dynamic(async () => {
            await delay(1) // yield control, so that the next event is received and takeLatest cancels the previous
            return profile
          })
        ],
        [select(getCurrentUserId), 'myid'],
        [call(processServerProfile, 'user|1', profile), 'passport']
      ])
      .run()
  })

  it('runs one request for each user', () => {
    const profile = { data: 'profile' }
    return expectSaga(passportSaga)
      .put(passportSuccess('user|1', 'passport1' as any))
      .put(passportSuccess('user|2', 'passport2' as any))
      .not.put(passportSuccess('user|1', 'passport1' as any))
      .not.put(passportSuccess('user|2', 'passport2' as any))
      .dispatch(passportRequest('user|1'))
      .dispatch(passportRequest('user|1'))
      .dispatch(passportRequest('user|2'))
      .dispatch(passportRequest('user|2'))
      .provide([
        [select(getProfileDownloadServer), 'server'],
        [select(getAccessToken), 'access-token'],
        [
          call(profileServerRequest, 'server', 'user|1', 'access-token'),
          dynamic(async () => {
            await delay(1) // yield control, so that the next event is received and takeLatest cancels the previous
            return profile
          })
        ],
        [select(getCurrentUserId), 'myid'],
        [call(processServerProfile, 'user|1', profile), 'passport1'],
        [
          call(profileServerRequest, 'server', 'user|2', 'access-token'),
          dynamic(async () => {
            await delay(1) // yield control, so that the next event is received and takeLatest cancels the previous
            return profile
          })
        ],
        [call(processServerProfile, 'user|2', profile), 'passport2']
      ])
      .run()
  })
})

describe('notifications behavior', () => {
  const getReturnsNull = (_: any) => undefined
  const getReturnsYes = (_: any) => 'notified'
  const noopSave = (_: any, __: any) => undefined
  const profile = {}
  const userId = 'userId'
  // TODO - fix tests - moliva - 2019-11-02
  xit('triggers on new item', () => {
    return expectSaga(compareInventoriesAndTriggerNotification, userId, [], ['newItem'], getReturnsNull, noopSave)
      .provide([[select(getProfile, userId), profile]])
      .put(notifyNewInventoryItem())
      .run()
  })
  xit('does not trigger if already sent', () => {
    return expectSaga(compareInventoriesAndTriggerNotification, userId, [], ['newItem'], getReturnsYes, noopSave)
      .provide([[select(getProfile, userId), profile]])
      .not.put(notifyNewInventoryItem())
      .run()
  })
  xit('does not trigger multiple notifications if more than one item', () => {
    return expectSaga(
      compareInventoriesAndTriggerNotification,
      userId,
      [],
      ['newItem', 'newItem2'],
      getReturnsYes,
      noopSave
    )
      .provide([[select(getProfile, userId), profile]])
      .put(notifyNewInventoryItem())
      .not.put(notifyNewInventoryItem())
      .run()
  })
})
