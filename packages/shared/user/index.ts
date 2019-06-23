import { User } from './types'
import { getCurrentProfile } from '../profile'

let userId: string | null = null
let address: string | null = null

export function getCurrentUser(): User {
  if (userId === null) {
    throw new Error('User was not initialized.')
  }

  return {
    id: userId,
    address,
    profile: getCurrentProfile()
  }
}

export function setCurrentUser(id: string, publicAddress: string | null = null) {
  if (userId !== null) {
    throw new Error('User was already set.')
  }

  userId = id
  address = publicAddress
}
