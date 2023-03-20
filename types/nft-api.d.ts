interface NftCharacter {
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

type NftCharacterWithViews = NftCharacter & { views: string }
