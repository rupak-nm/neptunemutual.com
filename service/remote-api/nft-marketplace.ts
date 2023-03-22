import { env } from '../../util/env'
import { aggregateFiltersData } from '../../util/nft'

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
  properties: Array<KeyValuePair<string>> = [],
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE,
  apiOrigin?: string
): Promise<ApiResponse<MarketplaceNft[]>> => {
  const origin = apiOrigin ?? getOrigins().apiOrigin
  const url = origin + '/marketplace/search'
  const body = JSON.stringify({
    search: searchQuery,
    properties,
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
    console.error(e)
    return {
      message: '',
      code: '0',
      data: []
    }
  }
}

const getMarketplaceFilters = async (): Promise<ApiResponse<Array<{
  key: string
  values: string[]
}>>> => {
  const url = getOrigins().apiOrigin + '/marketplace/properties'

  try {
    const res = await fetch(url)
    const { message, code, data } = await res.json()

    const aggregatedData = aggregateFiltersData<string>(data)
    return {
      message,
      data: aggregatedData,
      code
    }
  } catch (e) {
    console.error(e)
    return {
      message: '',
      code: '0',
      data: []
    }
  }
}

const NftMarketplace = {
  searchMarketplace,
  getMarketplaceFilters,
  getOrigins
}

export { NftMarketplace }
