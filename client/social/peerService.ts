import { getBaseWearables } from '../assets/wearables/base'

export type PeerReadyData = {
  receivedProfileVersion: boolean
  receivedPose: boolean
  receivedVisible: boolean
  foundProfileData: boolean
  resolvedMappings: boolean
  lastPing: number
}

export class PeerService {
  async setup() {
    const assets = await getBaseWearables()
  }
}
