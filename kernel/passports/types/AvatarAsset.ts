export type AvatarAsset = {
  thumbnail: string
  contents: Array<{
    file: string
    name: string
  }>
  path: string
  id: string
  name: string
  tags: string[]
  category: string
  i18n: {
    [language: string]: string
  }
  main: {
    type: string
    model: string
  }
}
