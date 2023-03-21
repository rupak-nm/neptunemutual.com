// const origin: string = env('NFT_API_ORIGIN')
const origin: string = 'https://nft-api.neptunemutual.net'

const DEFAULT_PAGE_SIZE = 25

const searchMarketplace = async (
  searchQuery = '',
  pageNumber = 1,
  pageSize = DEFAULT_PAGE_SIZE
): Promise<ApiResponse<MarketplaceNft[]>> => {
  const url = origin + '/marketplace/search'
  const body = JSON.stringify({
    search: searchQuery,
    properties: [
      {
        key: 'Type',
        value: 'Evolution'
      }
    ],
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
  searchMarketplace
}

export { NftMarketplace }
