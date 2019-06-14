// tslint:disable: no-commented-out-code
import Auth from 'decentraland-auth'

import { Profile } from './types'

export let profile: Profile | null = null

export async function fetchAndStoreProfile(auth: Auth): Promise<Profile | null> {
  let request = await auth.getRequest('https://profile.decentraland.zone/api/v1/profile')
  let response = await fetch(request)
  // TODO Should we create a default profile is not created?
  if (response.status === 404) {
    // const { user_id } = await auth.getAccessTokenData()
    // request = await auth.getRequest('https://profile.decentraland.zone/api/v1/profile', {
    //   method: 'POST',
    //   body: JSON.stringify({ id: user_id })
    // })
    // response = await fetch(request)
    return profile
  } else {
    profile = await response.json()
  }
  console['log']('profile', profile)
  return profile
}
