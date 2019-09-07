import { StoredAvatar } from './StoredAvatar'
export type StoredProfile = {
  userId: string
  name: string
  email: string
  avatar: StoredAvatar
  description: string
  created_at: number
  updated_at: number
  version: string
}
