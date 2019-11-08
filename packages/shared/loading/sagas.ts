import { fork, race, delay, put, select, call, take, takeLatest } from 'redux-saga/effects'
import { rotateHelpText, helpTexts, EXPERIENCE_STARTED, TELEPORT_TRIGGERED } from './types'
import { LoadingState } from './reducer'

export function* loadingSaga() {
  yield fork(changeSubtext)
  yield takeLatest(TELEPORT_TRIGGERED, changeSubtext)
}

export function* changeSubtext() {
  yield race({
    refresh: call(function*() {
      while (true) {
        yield put(rotateHelpText())
        yield delay(8000)
      }
    }),
    textInScreen: call(function*() {
      while (true) {
        const status = yield select(state => state.loading)
        yield call(() => updateTextInScreen(status))
        yield delay(200)
      }
    }),
    finish: call(function*() {
      yield take(EXPERIENCE_STARTED)
      yield take('Loading scene')
      while (true) {
        yield race({
          started: take('Started scene'),
          failed: take('Failed scene')
        })
        if (yield select(state => state.loading.pendingScenes === 0)) {
          break
        }
      }
    })
  })
}

export function updateTextInScreen(status: LoadingState) {
  const messages = document.getElementById('load-messages')
  if (messages) {
    messages.innerText = helpTexts[status.helpText]
  }
  const subMessages = document.getElementById('subtext-messages')
  if (subMessages) {
    subMessages.innerText =
      status.pendingScenes > 0 ? `Loading scenes (${status.pendingScenes} scenes remaining)` : status.status
  }
}
