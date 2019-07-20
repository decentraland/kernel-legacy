export type MessageEntry = {
  id: string
  sender: string
  message: string
  isCommand?: boolean
}

export interface IChatCommand {
  name: string
  description: string
  run: (message: string) => MessageEntry
}
