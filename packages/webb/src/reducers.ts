import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from './modules/auth'

export const createReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    auth: authReducer
  })
