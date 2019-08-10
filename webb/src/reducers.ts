import { combineReducers, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from 'modules/auth'
import { commsReducer } from 'modules/comms'
import { passportsReducer } from 'modules/passports'
import { assetsReducer } from 'modules/assets'
import { worldReducer } from 'modules/world'

export const createReducer: any = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (
      state: any,
      action: AnyAction
    ) => RouterState,
    auth: authReducer,
    assets: assetsReducer,
    comms: commsReducer,
    world: worldReducer,
    passports: passportsReducer
  })
