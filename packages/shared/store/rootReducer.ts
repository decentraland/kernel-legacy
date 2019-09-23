import { combineReducers } from 'redux'
import { passportsReducer } from '../passports/reducer'
import { authReducer } from '../auth/reducer'
import { rendererReducer } from '../renderer/reducer'

export const reducers = combineReducers({
  auth: authReducer,
  passports: passportsReducer,
  renderer: rendererReducer
})
