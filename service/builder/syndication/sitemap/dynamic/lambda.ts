import { Api } from '../../../../../types/enum'
import { getEnumerable } from '../../../../api'

const sitemapFor = async (api: Api, prefix: string): Promise<SitemapEnumerable> => {
  const enumerable = await getEnumerable<WithSlug>(api, 100000, 0)

  return {
    type: api,
    prefix,
    enumerable
  }
}

export { sitemapFor }
