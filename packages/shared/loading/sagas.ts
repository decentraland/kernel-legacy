import { fork, delay, put, select, call } from 'redux-saga/effects'
import { rotateHelpText, helpTexts } from './types'

export function* loadingSaga() {
  yield fork(changeSubtext)
}

export function* changeSubtext() {
  while (true) {
    yield put(rotateHelpText())
    const id = yield select(state => state.loading.helpText)
    yield call(() => updateTextInScreen(id))
    yield delay(8000)
  }
}

export function updateTextInScreen(id: number) {
  const messages = document.getElementById('messages')
  if (messages) {
    messages.innerText = helpTexts[id]
  }
}
