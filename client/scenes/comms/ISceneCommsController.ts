import { PeerInformation } from '@dcl/client/comms/types'

@registerAPI('CommsController')
export interface ISceneCommsController {
  cid: string
  notify(messagePayload: string, sender: PeerInformation): void
}
