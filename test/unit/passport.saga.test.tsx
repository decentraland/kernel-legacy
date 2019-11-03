import { expectSaga } from 'redux-saga-test-plan'
import { call, select, fork } from 'redux-saga/effects'
import { getAccessToken } from 'shared/auth/selectors'
import { notifyNewInventoryItem, passportFetch, passportQuery, passportSuccess } from 'shared/passports/actions'
import {
  compareInventoriesAndTriggerNotification,
  handleFetchProfile,
  handlePassportQuery,
  profileServerRequest
} from 'shared/passports/sagas'
import { getProfile, getProfileDownloadServer } from 'shared/passports/selectors'

describe('fetchProfile behavior', () => {
  it('behaves normally', async () => {
    const result = await expectSaga(handlePassportQuery, passportQuery('userId'))
      .provide([
        [select(getProfile, 'userId'), undefined],
        [select(getProfileDownloadServer), 'server'],
        [select(getAccessToken), 'access-token'],
        [call(profileServerRequest, 'server', 'userId', 'access-token'), { data: 'profile' }],
        [fork(handleFetchProfile, passportFetch('userId')), undefined]
      ])
      .put(passportQuery('userId'))
      .run()
    console.log(result)
  })
})

describe('sequential queries', () => {
  it('behaves normally', () => {
    expectSaga(handleFetchProfile, passportFetch('userId'))
      .provide([
        [select(getProfileDownloadServer), 'server'],
        [select(getAccessToken), 'access-token'],
        [call(profileServerRequest, 'server', 'userId', 'access-token'), { data: 'profile' }]
      ])
      .put(passportSuccess('userId', 'profile' as any))
      .run()
  })
})

describe('notifications behavior', () => {
  const getReturnsNull = (_: any) => undefined
  const getReturnsYes = (_: any) => 'notified'
  const noopSave = (_: any, __: any) => undefined
  const profile = {}
  const userId = 'userId'
  it('triggers on new item', () => {
    expectSaga(compareInventoriesAndTriggerNotification, userId, [], ['newItem'], getReturnsNull, noopSave)
      .provide([[select(getProfile, userId), profile]])
      .put(notifyNewInventoryItem())
      .run()
  })
  it('does not trigger if already sent', () => {
    expectSaga(compareInventoriesAndTriggerNotification, userId, [], ['newItem'], getReturnsYes, noopSave)
      .provide([[select(getProfile, userId), profile]])
      .not.put(notifyNewInventoryItem())
      .run()
  })
  it('does not trigger multiple notifications if more than one item', () => {
    expectSaga(compareInventoriesAndTriggerNotification, userId, [], ['newItem', 'newItem2'], getReturnsYes, noopSave)
      .provide([[select(getProfile, userId), profile]])
      .put(notifyNewInventoryItem())
      .not.put(notifyNewInventoryItem())
      .run()
  })
})
