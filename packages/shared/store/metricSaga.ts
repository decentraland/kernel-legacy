import { takeEvery } from 'redux-saga/effects'
import { queueTrackingEvent } from '../analytics'
import {
  COMMS_ESTABLISHED,
  ESTABLISHING_COMMS,
  ExecutionLifecycleEvent,
  ExecutionLifecycleEventsList,
  LOADING_STARTED,
  NOT_STARTED,
  WAITING_FOR_RENDERER,
  UNITY_CLIENT_LOADED,
  LOADING_SCENES,
  EXPERIENCE_STARTED,
  TELEPORT_TRIGGERED,
  SCENE_ENTERED,
  UNEXPECTED_ERROR_LOADING_CATALOG,
  UNEXPECTED_ERROR,
  AUTH_SUCCESSFUL,
  NO_WEBGL_COULD_BE_CREATED,
  AUTH_ERROR_LOGGED_OUT,
  CONTENT_SERVER_DOWN,
  FAILED_FETCHING_UNITY,
  COMMS_ERROR_RETRYING,
  COMMS_COULD_NOT_BE_ESTABLISHED,
  MOBILE_NOT_SUPPORTED,
  NOT_INVITED
} from '../loading/types'

const trackingEvents: Record<ExecutionLifecycleEvent, string> = {
  // lifecycle events
  [NOT_STARTED]: 'session_start',
  [LOADING_STARTED]: 'loading_1_start',
  [AUTH_SUCCESSFUL]: 'loading_2_authOK',
  [ESTABLISHING_COMMS]: 'loading_3_init_comms',
  [COMMS_ESTABLISHED]: 'loading_4_comms_established',
  [WAITING_FOR_RENDERER]: 'loading_5_wait_renderer',
  [UNITY_CLIENT_LOADED]: 'loading_6_unity_ok',
  [LOADING_SCENES]: 'loading_7_load_scenes',
  [EXPERIENCE_STARTED]: 'loading_8_finished',
  [TELEPORT_TRIGGERED]: 'teleport_triggered',
  [SCENE_ENTERED]: 'scene_entered',
  // errors
  [UNEXPECTED_ERROR]: 'error_fatal',
  [UNEXPECTED_ERROR_LOADING_CATALOG]: 'error_catalog',
  [NO_WEBGL_COULD_BE_CREATED]: 'error_webgl',
  [AUTH_ERROR_LOGGED_OUT]: 'error_authfail',
  [CONTENT_SERVER_DOWN]: 'error_contentdown',
  [FAILED_FETCHING_UNITY]: 'error_fetchengine',
  [COMMS_ERROR_RETRYING]: 'error_comms',
  [COMMS_COULD_NOT_BE_ESTABLISHED]: 'error_comms_failed',
  [MOBILE_NOT_SUPPORTED]: 'unsupported_mobile',
  [NOT_INVITED]: 'error_not_invited'
}

export function* metricSaga() {
  for (const event of ExecutionLifecycleEventsList) {
    yield takeEvery(event, action => queueTrackingEvent('lifecycle event', toTrackingEvent(event)))
  }
}

function toTrackingEvent(event: ExecutionLifecycleEvent) {
  return trackingEvents[event] || event
}
