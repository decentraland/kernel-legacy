import { combineReducers, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from 'dcl/webb/src/modules/auth'
import { commsReducer } from 'dcl/webb/src/modules/comms'
import { passportsReducer } from 'dcl/webb/src/modules/passports'
import { assetsReducer } from 'dcl/webb/src/modules/assets'
import { worldReducer } from 'dcl/webb/src/modules/world'

export const createReducer: any = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState,
    auth: authReducer,
    assets: assetsReducer,
    comms: commsReducer,
    world: worldReducer,
    passports: passportsReducer
  })
