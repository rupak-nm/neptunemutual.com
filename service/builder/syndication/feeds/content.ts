import { getEnumerable } from '../../../api'
import { config } from './config'

const get = async (type: string): Promise<Article[]> => {
  if (!config.allowed.includes(type)) {
    throw new Error(`Invalid type ${type}`)
  }

  return await getEnumerable<Article>(type, 10000, 0)
}

export { get }
