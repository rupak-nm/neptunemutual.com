import { env } from '../../util/env'

const origin: string = env('NFT_API_ORIGIN')

const knowYourCharacters = async (): Promise<ApiResponse<NftCharacterModel[]>> => {
  const response = await fetch(origin + '/home/know-the-characters')

  const data = await response.json()

  return data
}

const NftApi = {
  knowYourCharacters
}

export { NftApi }
