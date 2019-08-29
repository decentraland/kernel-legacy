import { PeerInformation } from '@dcl/kernel/comms/types'

@registerAPI('CommsController')
export interface ISceneCommsController {
  cid: string
  notify(messagePayload: string, sender: PeerInformation): void
}
