export type IContentItemChat = {
  date: number
  content: string
  isAdmin?: boolean
  isSeen?: boolean
  attributes?: { [key: string]: any }
}

export type ItemChatProps = {
  key: string
  content: IContentItemChat
}
