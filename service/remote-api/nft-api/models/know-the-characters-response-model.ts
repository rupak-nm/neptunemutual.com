interface KnowTheCharactersResponseModel {
  message: string
  code: string
  data: KnowTheCharactersCharacterModel[]
}

interface KnowTheCharactersCharacterModel {
  level?: number
  role: string
  name: string
  description: string
  startIndex: number
  image: string
  siblings: number
  rarity: number
  type?: string
}

export { KnowTheCharactersCharacterModel, KnowTheCharactersResponseModel }
