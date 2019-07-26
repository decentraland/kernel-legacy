import { AnyAction, Middleware, Store } from 'redux'

import { jsonFetch } from '@dcl/utils/dist/network/jsonFetch'

import { AuthRootState } from 'modules/auth'

export type WorldActions = [
  { type: 'Set selected world parcel', payload: { x: number, y: number } },
  { type: 'Set land api data', payload: { x: number, y: number, owner: string, district_id?: string, estate_id?: string, update_operator?: string, operator?: string } },
  { type: 'Set coordinate to scene data', payload: { x: number, y: number, scene: string } },
  { type: 'Set mappings data', payload: { scene: string } },
  { type: 'Set scene json data', payload: { scene: string } },
  { type: 'Set scene manifest', payload: { scene: string }}
]

export type ParcelData = { x: number, y: number, owner: string, district_id?: string, estate_id?: string, update_operator?: string, operator?: string }

export type Loading = { loading: boolean, empty?: boolean }

export type StringOrLoading = string | Loading

export type WorldState = {
  parcel?: { x: number, y: number }
  parcelData: { [key: string]: ParcelData | Loading }
  coordinateToScene: { [key: string]: StringOrLoading }
  mappings: { [key: string]: any }
  sceneJson: { [key: string]: any }
  sceneManifest: { [key: string]: any }
}

export type WorldRootState = {
  world: WorldState
}

export const INITIAL_STATE: WorldState = {
  parcelData: {},
  coordinateToScene: {},
  mappings: {},
  sceneJson: {},
  sceneManifest: {}
}

export function worldReducer(state?: WorldState, action?: AnyAction): WorldState {
  if (!state) {
    return INITIAL_STATE
  }
  if (!action) {
    return state
  }
  switch (action.type) {
    case 'Set selected world parcel':
      return { ...state, parcel: action.payload }
    case 'Set land api data':
      return { ...state, parcelData: {...state.parcelData, [`${action.payload.parcel.x}.${action.payload.parcel.y}`]: action.payload.data } }
    case 'Set coordinate to scene data':
      return { ...state, coordinateToScene: { ...state.coordinateToScene, [`${action.payload.x}.${action.payload.y}`]: action.payload.scene } }
    case 'Set mappings data':
      return { ...state, mappings: { ...state.mappings, [action.payload.scene]: action.payload.data }}
    case 'Set scene json data':
      return {
        ...state,
        sceneJson: {
          ...state.sceneJson,
          [action.payload.scene]: action.payload.data
        }
      }
    case 'Loading land api data':
      return { ...state, parcelData: {...state.parcelData, [`${action.payload.x}.${action.payload.y}`]: { loading: true } } }
    case 'Loading parcel to scene mapping':
      return { ...state, coordinateToScene: { ...state.coordinateToScene, [`${action.payload.parcel.x}.${action.payload.parcel.y}`]: { loading: true } } }
    case 'Empty scene data':
      return { ...state, coordinateToScene: { ...state.coordinateToScene, [`${action.payload.parcel.x}.${action.payload.parcel.y}`]: { loading: false, empty: true } } }
    case 'Loading scene file mappings':
      return { ...state, mappings: { ...state.mappings, [action.payload.scene]: { loading: true } }}
    case 'Loading scene json data':
      return { ...state, sceneJson: { ...state.sceneJson, [action.payload.scene]: { loading: true } }}
    default:
      return state
  }
}

/**
 * State transitions that require side-effects
 */
export const worldMiddleware = (store: Store<WorldRootState & AuthRootState>) => (next: Middleware) => (action: any) => {
  const nextState = next(action)
  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (action.payload.location.pathname.startsWith('/parcel/')) {
        const [x, y] = action.payload.location.pathname.split('/')[2].split('.')
        store.dispatch({ type: 'Set selected world parcel', payload: {x, y} })
      }
      break
    case 'Set selected world parcel':
      let coordinateParcel = `${action.payload.x}.${action.payload.y}`
      if (!store.getState().world.parcelData[coordinateParcel]) {
        store.dispatch({ type: 'Loading land api data', payload: action.payload })
        fetchParcelInfo(store, action.payload)
      }
      break
    case 'Set land api data':
      let coordinateApi = `${action.payload.parcel.x}.${action.payload.parcel.y}`
      if (!store.getState().world.coordinateToScene[coordinateApi]) {
        store.dispatch({ type: 'Loading parcel to scene mapping', payload: action.payload })
        fetchParcelToSceneMapping(store, action.payload)
      }
      break
    case 'Set coordinate to scene data':
      let sceneData = action.payload.scene
      if (!store.getState().world.mappings[sceneData]) {
        store.dispatch({ type: 'Loading scene file mappings', payload: action.payload })
        fetchSceneMappings(store, action.payload)
      }
      break
    case 'Set mappings data':
      let sceneJson = action.payload.scene
      if (!store.getState().world.sceneJson[sceneJson]) {
        store.dispatch({ type: 'Loading scene json data', payload: action.payload })
        fetchSceneJson(store, action.payload)
      }
      break
    default:
      break
  }
  return nextState
}

export async function fetchParcelInfo(store: Store<WorldRootState>, parcel: { x: number, y: number } ) {
  const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
    const apiData = await jsonFetch(`https://api.decentraland.org/v1/parcels/${parcel.x}/${parcel.y}/`)
    dispatch({ type: 'Set land api data', payload: { parcel, data: apiData.data }})
}
export async function fetchParcelToSceneMapping(store: Store<WorldRootState>, payload: { parcel: { x: number, y: number } }) {
  const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
  const { parcel } = payload
  const apiData = await jsonFetch(`https://content.decentraland.org/scenes?x1=${parcel.x}&x2=${parcel.x}&y1=${parcel.y}&y2=${parcel.y}`)
  let thisScene = ''
  for (let value of apiData.data) {
    const [ dx, dy ] = value.parcel_id.split(',').map((_: string) => parseInt(_, 10))
    thisScene = value.scene_cid
    dispatch({ type: 'Set coordinate to scene data', payload: { x: dx, y: dy, scene: thisScene } })
  }
  if (!thisScene) {
    dispatch({ type: 'Empty scene data', payload: { parcel } })
  }
}
export async function fetchSceneMappings(store: Store<WorldRootState>, payload: { x: number, y: number, scene: string }) {
  const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
  const { scene } = payload
  const result = await jsonFetch(`https://content.decentraland.org/parcel_info?cids=${scene!}`)
  dispatch({ type: 'Set mappings data', payload: { scene: scene, data: result.data[0].content }})
}
export async function fetchSceneJson(store: Store<WorldRootState>, payload: { scene: string, data: any } ) {
  const { scene, data } = payload
  const mappings = data
  const dispatch = (type: any, payload?: any) => typeof type === 'string' ? store.dispatch({ type, payload }) : store.dispatch(type)
  const sceneJsonCID = mappings.contents.filter((_: any) => _.file && _.file === 'scene.json')[0].hash
  const sceneJson = await jsonFetch(`https://content.decentraland.org/contents/${sceneJsonCID}`)
  dispatch({ type: 'Set scene json data', payload: { scene: scene!, data: sceneJson } })
}
