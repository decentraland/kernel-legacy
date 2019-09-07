import {
  AuthRequestAction,
  AuthSuccessAction,
  AuthFailureAction,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_FAILURE,
  TOKEN_REQUEST,
  TokenRequestAction,
  TokenSuccessAction,
  TokenFailureAction,
  TOKEN_SUCCESS,
  TOKEN_FAILURE
} from './actions'
import { AuthState } from './types'

export const INITIAL_STATE: AuthState = {
  loading: [],
  commsToken: null,
  ephemeral: null,
  data: null,
  error: null
}

function removeLast(actions: any, comparator: any) {
  var last = actions.filter(comparator).pop()
  return actions.filter(function(action) {
    return action !== last
  })
}
const getType = function(action: any) {
  return action.type.slice(10)
}
const getStatus = function(action: any) {
  return action.type.slice(1, 8).toUpperCase()
}

function loadingReducer(state: any, action: any) {
  if (state === void 0) {
    state = exports.INITIAL_STATE
  }
  var type = getType(action)
  var status = getStatus(action) // REQUEST, SUCCESS, FAILURE
  switch (status) {
    case 'REQUEST': {
      return state.concat([action])
    }
    case 'FAILURE':
    case 'SUCCESS': {
      return removeLast(state, function(actionItem: any) {
        return getType(actionItem) === type
      })
    }
    default:
      return state
  }
}

export type AuthReducerAction =
  | AuthRequestAction
  | AuthSuccessAction
  | AuthFailureAction
  | TokenRequestAction
  | TokenSuccessAction
  | TokenFailureAction

export function authReducer(state: AuthState = INITIAL_STATE, action: AuthReducerAction): AuthState {
  switch (action.type) {
    case AUTH_REQUEST: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action)
      }
    }
    case AUTH_SUCCESS: {
      return {
        ...state,
        data: action.payload.data,
        loading: loadingReducer(state.loading, action),
        error: null
      }
    }
    case AUTH_FAILURE: {
      return {
        ...state,
        data: null,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    case TOKEN_REQUEST: {
      return {
        ...state,
        commsToken: null,
        ephemeral: action.payload.ephemeral,
        loading: loadingReducer(state.loading, action)
      }
    }
    case TOKEN_SUCCESS: {
      return {
        ...state,
        commsToken: action.payload.commsToken,
        loading: loadingReducer(state.loading, action)
      }
    }
    case TOKEN_FAILURE: {
      return {
        ...state,
        loading: loadingReducer(state.loading, action),
        error: action.payload.error
      }
    }
    default: {
      return state
    }
  }
}
