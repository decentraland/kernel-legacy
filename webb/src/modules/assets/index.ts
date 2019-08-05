import { Middleware, Store, AnyAction } from 'redux'
import { jsonFetch } from '@dcl/utils/network/jsonFetch'

export type AssetAction = {
  type:
    | 'Add Asset Pack Definition'
    | 'Add Asset Pack Contents'
    | 'Initialized'
    | 'Switch tab'
    | 'Add Asset Info'
    | 'Fetch Asset'
  payload: any
}

export type AssetPackDefinition = {
  placeable: boolean
  id: string
  title: string
  thumbnail: string
  url: string
}

export type AssetCategories = string[]

export type AssetDefinition = {
  id: string
  name: string
  title: string
  thumbnail: string
  category: string
  url: string
  tags: string[]
  variations: string
  contents: {
    [name: string]: string
  }
}

export type AssetsState = {
  status: 'Not initialized' | 'Initialized'
  currentTab: string
  packs: { [key: string]: AssetPackDefinition }
  contents: { [key: string]: { [category: string]: AssetDefinition[] } }
}

export const EMPTY_ASSETS = {
  status: 'Not initialized',
  currentTab: 'Wearables',
  packs: {},
  contents: {},
  info: {}
}

export function assetsReducer(
  state = EMPTY_ASSETS,
  action?: AssetAction | AnyAction
) {
  if (!action) return state

  switch (action.type) {
    case 'Initialized':
      return { ...state, status: 'Initialized' }
    case 'Switch tab':
      return { ...state, currentTab: action.payload }
    case 'Add Asset Pack Definition':
      return {
        ...state,
        packs: { ...state.packs, [action.payload.id]: action.payload }
      }
    case 'Add Asset Pack Contents':
      const byCategories: any = {}
      for (let assetDefinition of action.payload.contents) {
        byCategories[assetDefinition.category] =
          byCategories[assetDefinition.category] || []
        byCategories[assetDefinition.category].push(assetDefinition)
      }
      return {
        ...state,
        contents: { ...state.contents, [action.payload.id]: byCategories }
      }
  }
  return state
}

/**
 * State transitions that require side-effects
 */
export const assetsMiddleware: any = (store: Store<AssetsState>) => (
  next: Middleware
) => (action: any) => {
  const dispatch = (type: any, payload?: any) =>
    typeof type === 'string'
      ? store.dispatch({ type, payload })
      : store.dispatch(type)

  switch (action.type) {
    case '@@router/LOCATION_CHANGE':
      if (needsInitialization(store, action)) {
        dispatch('Initialized')
        fetchBuilderAssets(store, dispatch)
        fetchAvatarAssets(store, dispatch)
      }
      break
    case 'Fetch Builder Asset Pack':
      fetchBuilderAssetPack(store, dispatch, action.payload)
      break
  }
  return next(action)
}

export async function fetchAvatarAssets(store: any, dispatch: any) {
  const assets = await jsonFetch('https://avatar-assets.now.sh')
  dispatch('Add Asset Pack Definition', {
    placeable: false,
    id: 'dcl://base-avatars/',
    title: 'Base Avatars',
    thumbnail:
      'https://avatars.decentraland.org/static/media/image-customize.83614e82.png',
    url: 'https://avatar-assets.now.sh'
  })
  dispatch('Add Asset Pack Contents', {
    id: 'dcl://base-avatars/',
    contents: assets.data.map((t: any) => ({
      ...t,
      thumbnail: t.thumbnail.replace('content', 'content-service')
    }))
  })
}
export async function fetchBuilderAssetPack(
  store: any,
  dispatch: any,
  url: string
) {
  const assets = await jsonFetch(url)
  const idParts = url.split('/')
  const id = idParts[idParts.length - 1].split('.')[0]
  dispatch('Add Asset Pack Contents', { id, contents: assets.data.assets })
}
export async function fetchBuilderAssets(store: any, dispatch: any) {
  const baseUrl = 'https://builder-packs-prod.now.sh'
  const assets = await jsonFetch('https://builder-packs-prod.now.sh')
  for (let assetPack of assets.data.packs) {
    dispatch('Add Asset Pack Definition', { ...assetPack, placeable: true })
    dispatch('Fetch Builder Asset Pack', baseUrl + assetPack.url)
  }
}

export function needsInitialization(store: Store<AssetsState>, action: any) {
  return (
    store.getState().status === 'Not initialized' &&
    action.type !== 'Initialized'
  )
}
