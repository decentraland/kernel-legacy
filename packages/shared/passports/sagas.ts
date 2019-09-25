import { call, put, race, select, take, takeEvery, takeLatest } from 'redux-saga/effects'
import { getServerConfigurations } from '../../config'
import { getAccessToken, getCurrentUserId } from '../auth/selectors'
import defaultLogger from '../logger'
import { isInitialized } from '../renderer/selectors'
import { RENDERER_INITIALIZED } from '../renderer/types'
import {
  addCatalog,
  AddCatalogAction,
  ADD_CATALOG,
  catalogLoaded,
  CATALOG_LOADED,
  inventoryFailure,
  InventoryRequest,
  inventoryRequest,
  inventorySuccess,
  InventorySuccess,
  INVENTORY_FAILURE,
  INVENTORY_REQUEST,
  INVENTORY_SUCCESS,
  passportRandom,
  PassportRandomAction,
  PassportRequestAction,
  passportSuccess,
  PassportSuccessAction,
  PASSPORT_RANDOM,
  PASSPORT_REQUEST,
  PASSPORT_SUCCESS,
  saveAvatarFailure,
  SaveAvatarRequest,
  saveAvatarSuccess,
  SAVE_AVATAR_REQUEST,
  setProfileServer
} from './actions'
import { generateRandomUserProfile } from './generateRandomUserProfile'
import { baseCatalogsLoaded, getProfile, getProfileDownloadServer } from './selectors'
import { legacyProfilesToAvatar } from './transformations/legacyProfilesToAvatar'
import { profileToRendererFormat } from './transformations/profileToRendererFormat'
import { ensureServerFormat } from './transformations/profileToServerFormat'
import { Avatar, Catalog, Profile } from './types'

/**
 * This saga handles both passports and assets required for the renderer to show the
 * users' inventory and avatar editor.
 *
 * When the renderer is initialized, it will fetch the asset catalog and submit it to the renderer.
 *
 * Whenever a passport is requested, it will fetch it and store it locally (see also: `selectors.ts`)
 *
 * If a user avatar was not found, it will create a random passport (see: `handleRandomAsSuccess`)
 *
 * Lastly, we handle save requests by submitting both to the avatar legacy server as well as to the profile server.
 *
 * It's *very* important for the renderer to never receive a passport with items that have not been loaded into the catalog.
 */
export function* passportSaga(): any {
  yield put(setProfileServer(getServerConfigurations().avatar.server))
  yield takeEvery(RENDERER_INITIALIZED, initialLoad)

  yield takeLatest(ADD_CATALOG, handleAddCatalog)

  yield takeLatest(PASSPORT_REQUEST, handleFetchProfile)
  yield takeLatest(PASSPORT_SUCCESS, submitPassportToRenderer)
  yield takeLatest(PASSPORT_RANDOM, handleRandomAsSuccess)

  yield takeLatest(SAVE_AVATAR_REQUEST, handleSaveAvatar)

  yield takeLatest(INVENTORY_REQUEST, handleFetchInventory)
}

export function* initialLoad() {
  try {
    const baseAvatars = yield call(fetchCatalog, 'https://dcl-base-avatars.now.sh/expected.json')
    const baseExclusive = yield call(fetchCatalog, 'https://dcl-base-exclusive.now.sh/expected.json')
    if (!(yield select(isInitialized))) {
      yield take(RENDERER_INITIALIZED)
    }
    yield put(addCatalog('base-avatars', baseAvatars))
    yield put(addCatalog('base-exclusive', baseExclusive))
  } catch (error) {
    defaultLogger.error('[FATAL]: Could not load catalog!', error)
  }
}

export function* handleFetchProfile(action: PassportRequestAction): any {
  const userId = action.payload.userId
  try {
    const serverUrl = yield select(getProfileDownloadServer)
    const accessToken = yield select(getAccessToken)
    const profile = yield call(legacyProfileRequest, serverUrl, accessToken)
    const avatar = legacyProfilesToAvatar(profile.data)
    yield put(inventoryRequest(userId))
    const inventoryResult = yield race({
      success: take(INVENTORY_SUCCESS),
      failure: take(INVENTORY_FAILURE)
    })
    if (inventoryResult.failure) {
      defaultLogger.error(`Unable to fetch inventory for ${userId}:`, inventoryResult.failure)
    } else {
      avatar.inventory = (inventoryResult.success as InventorySuccess).payload.inventory.map(dropIndexFromExclusives)
    }
    yield put(passportSuccess(userId, avatar))
  } catch (error) {
    const randomizedUserProfile = yield call(generateRandomUserProfile, userId)
    yield put(inventoryRequest(userId))
    const inventoryResult = yield race({
      success: take(INVENTORY_SUCCESS),
      failure: take(INVENTORY_FAILURE)
    })
    if (inventoryResult.failure) {
      defaultLogger.error(`Unable to fetch inventory for ${userId}:`, inventoryResult.failure)
    } else {
      randomizedUserProfile.avatar.inventory = (inventoryResult.success as InventorySuccess).payload.inventory.map(dropIndexFromExclusives)
    }
    yield put(passportRandom(userId, randomizedUserProfile))
  }
}

export async function legacyProfileRequest(serverUrl: string, accessToken: string) {
  try {
    const request = await fetch(`${serverUrl}api/profile/`, {
      headers: {
        Authorization: 'Bearer ' + accessToken
      }
    })
    if (!request.ok) {
      throw new Error('Profile not found')
    }
    return await request.json()
  } catch (up) {
    throw up
  }
}

export function* handleRandomAsSuccess(action: PassportRandomAction): any {
  // TODO (eordano, 16/Sep/2019): See if there's another way around people expecting PASSPORT_SUCCESS
  yield put(passportSuccess(action.payload.userId, action.payload.profile))
}

export function* handleAddCatalog(action: AddCatalogAction): any {
  // TODO (eordano, 16/Sep/2019): Validate correct schema
  if (!action.payload.catalog) {
    return
  }
  if (!(yield select(isInitialized))) {
    yield take(RENDERER_INITIALIZED)
  }
  yield call(sendWearablesCatalog, action.payload.catalog)
  yield put(catalogLoaded(action.payload.name))
}

export async function fetchCatalog(url: string) {
  const request = await fetch(url)
  if (!request.ok) {
    throw new Error('Catalog not found')
  }
  return request.json()
}

export function sendWearablesCatalog(catalog: Catalog) {
  (global as any)['unityInterface'].AddWearablesToCatalog(catalog)
}

export function* submitPassportToRenderer(action: PassportSuccessAction): any {
  if ((yield select(getCurrentUserId)) === action.payload.userId) {
    if (!(yield select(isInitialized))) {
      yield take(RENDERER_INITIALIZED)
    }
    while (!(yield select(baseCatalogsLoaded))) {
      yield take(CATALOG_LOADED)
    }
    yield call(sendLoadProfile, action.payload.profile)
  }
}

export function* sendLoadProfile(profile: Profile) {
  while (!(yield select(baseCatalogsLoaded))) {
    yield take(CATALOG_LOADED)
  }
  (global as any)['unityInterface'].LoadProfile(profileToRendererFormat(profile))
}

export function fetchCurrentProfile(accessToken: string, uuid: string) {
  const authHeader = {
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  const request = `${getServerConfigurations().profile}/profile${uuid ? '/' + uuid : ''}`
  return fetch(request, authHeader)
}

export function* handleFetchInventory(action: InventoryRequest) {
  const { userId } = action.payload
  // @TODO (eordano, 20/Sep/2019): Query the Profile Server the user's ethereum address and hit the wearables-api
  const MOCK_ETHEREUM_ADDRESS = '0x0a6Fd8C23e0ECfa9aD8cBda9EDCBEDEC2e1E38fD'
  const ethereumAddress = MOCK_ETHEREUM_ADDRESS
  try {
    const inventoryItems = yield call(fetchInventoryItemsByAddress, ethereumAddress)
    yield put(inventorySuccess(userId, inventoryItems))
  } catch (error) {
    yield put(inventoryFailure(userId, error))
  }
}

function dropIndexFromExclusives(exclusive: string) {
  return exclusive
    .split('/')
    .slice(0, 4)
    .join('/')
}

export async function fetchInventoryItemsByAddress(address: string) {
  const result = await fetch(getServerConfigurations().wearablesApi + '/address/' + address)
  if (!result.ok) {
    throw new Error('Unable to fetch inventory for address ' + address)
  }
  return (await result.json()).inventory
}

export function* handleSaveAvatar(saveAvatar: SaveAvatarRequest) {
  const userId = saveAvatar.payload.userId ? saveAvatar.payload.userId : yield select(getCurrentUserId)
  try {
    const currentVersion = (yield select(getProfile, userId)).version || 0
    const accessToken = yield select(getAccessToken)
    const url = `${getServerConfigurations().profile}/profile/avatar/${userId}`
    const response = yield call(modifyAvatar, {
      url,
      method: currentVersion === 0 ? 'PUT' : 'POST',
      userId,
      currentVersion,
      accessToken,
      profile: saveAvatar.payload.profile
    })
    if (response.ok) {
      const url2 = `${getServerConfigurations().avatar}/profile/avatar`
      const response2 = yield call(modifyAvatar, {
        url: url2,
        method: 'POST',
        userId,
        currentVersion,
        accessToken,
        profile: saveAvatar.payload.profile
      })
      if (response2.ok) {
        yield put(saveAvatarSuccess(userId))
        const updatedProfile: Profile = yield select(getProfile, userId)
        yield sendLoadProfile(updatedProfile)
      }
    } else {
      yield put(saveAvatarFailure(userId, 'unknown reason'))
    }
  } catch (error) {
    yield put(saveAvatarFailure(userId, 'unknown reason'))
  }
}

/**
 * @TODO (eordano, 16/Sep/2019): Upgrade the avatar schema on Profile Server
 */
export async function modifyAvatar(params: {
  url: string
  method: 'PUT' | 'POST'
  currentVersion: number
  userId: string
  accessToken: string
  profile: { avatar: Avatar; face: string; body: string }
}) {
  const { url, method, currentVersion, profile, accessToken } = params
  const { face, avatar, body } = profile
  const payload = JSON.stringify({
    avatar: ensureServerFormat(avatar, currentVersion)
  })
  const options = {
    method,
    body: payload,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  }
  await saveSnapshots(url, accessToken, face, body)

  const response = await fetch(url, options)
  return response
}

async function saveSnapshots(userURL: string, accessToken: string, face: string, body: string) {
  const data = new FormData()
  data.append('face', stringToBlob(face), 'face.png')
  data.append('body', stringToBlob(body), 'body.png')
  return fetch(`${userURL}/snapshot`, {
    method: 'POST',
    body: data,
    headers: {
      Authorization: 'Bearer ' + accessToken
    }
  })
}
function stringToBlob(str: string) {
  return new Blob([str], { type: 'application/base64' })
}
