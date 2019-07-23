import { combineReducers, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from 'modules/auth'
import { commsReducer } from 'modules/comms'
import { passportsReducer } from 'modules/passports'
import { assetsReducer } from 'modules/assets'

export const createReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState,
    auth: authReducer,
    assets: assetsReducer,
    comms: commsReducer,
    passports: passportsReducer
  })
