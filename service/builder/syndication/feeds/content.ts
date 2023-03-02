import { Api } from '../../../../types/enum'
import { getEnumerable } from '../../../api'
import { config } from './config'

const get = async (api: Api): Promise<Article[]> => {
  if (!config.allowed.includes(api)) {
    throw new Error(`Invalid type ${api}`)
  }

  return await getEnumerable<Article>(api, 10000, 0)
}

export { get }
