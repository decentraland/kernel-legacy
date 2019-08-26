import { AvatarMessageType } from './AvatarMessageType'

export type PlayerChatAction = {
  type:
    | AvatarMessageType.SET_LOCAL_UUID
    | AvatarMessageType.USER_BLOCKED
    | AvatarMessageType.USER_UNBLOCKED
    | AvatarMessageType.USER_MUTED
    | AvatarMessageType.USER_UNMUTED
    | AvatarMessageType.SHOW_WINDOW
  uuid: string
}
