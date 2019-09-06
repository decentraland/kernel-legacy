import { combineReducers, AnyAction } from 'redux'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'

import { authReducer } from '~/modules/auth'
import { commsReducer } from '~/modules/comms'
import { passportsReducer } from "~/modules/passportsReducer"
import { worldReducer } from '~/modules/world'
import { systemsReducer } from './modules/systems'

export const createReducer: any = (history: History) =>
  combineReducers({
    router: connectRouter(history) as (state: any, action: AnyAction) => RouterState,
    auth: authReducer,
    comms: commsReducer,
    systems: systemsReducer,
    world: worldReducer,
    passports: passportsReducer
  })
