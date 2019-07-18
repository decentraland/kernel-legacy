import { combineReducers, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from 'modules/auth'

export const createReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState,
    auth: authReducer
  })
