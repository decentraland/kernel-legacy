import { PeerInformation } from '../..//comms/types/PeerInformation'

export interface ISceneCommsController {
  cid: string
  notify(messagePayload: string, sender: PeerInformation): void
}
