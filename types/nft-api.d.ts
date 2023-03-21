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

interface MarketplaceNft {
  nickname: string
  family: string
  tokenId: string
  views: string
  wantToMint: string
  siblings: number
  pageSize: number
  pageNumber: number
  totalRecords: number
  totalPages: number
}
