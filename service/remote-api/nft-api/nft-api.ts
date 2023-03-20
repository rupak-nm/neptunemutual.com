import { env } from '../../../util/env'
import { KnowTheCharactersResponseModel } from './models/know-the-characters-response-model'

const origin: string = env('NFT_API_ORIGIN')

const knowYourCharacters = async (): Promise<KnowTheCharactersResponseModel> => {
  const response = await fetch(origin + '/home/know-the-characters')

  const data = await response.json() as KnowTheCharactersResponseModel

  return data
}

const NftApi = {
  knowYourCharacters
}

export { NftApi }
