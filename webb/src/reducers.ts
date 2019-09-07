import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'
import { AnyAction, combineReducers } from 'redux'

export const createReducer: any = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState
  })
