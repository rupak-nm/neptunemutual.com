import { env } from '../../util/env'

const getOrigins = (): {
  apiOrigin: string
  imageOrigin: string
} => {
  return {
    apiOrigin: env('NFT_API_ORIGIN'),
    imageOrigin: env('NFT_IMAGE_ORIGIN')
  }
}

const DEFAULT_PAGE_SIZE = 25

const searchMarketplace = async (
  searchQuery = '',
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  apiOrigin?: string
): Promise<ApiResponse<MarketplaceNft[]>> => {
  const origin = apiOrigin ?? getOrigins().apiOrigin
  const url = origin + '/marketplace/search'
  const body = JSON.stringify({
    search: searchQuery,
    properties: [],
    pageNumber,
    pageSize
  })

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body
    })

    const data = await response.json()

    return data
  } catch (e) {
    console.log({ e })
    return {
      message: '',
      code: '0',
      data: []
    }
  }
}

const NftMarketplace = {
  searchMarketplace,
  getOrigins
}

export { NftMarketplace }
