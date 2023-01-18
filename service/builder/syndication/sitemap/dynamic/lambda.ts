import { getEnumerable } from '../../../../api'

const sitemapFor = async (type: string, prefix: string): Promise<SitemapEnumerable> => {
  const enumerable = await getEnumerable<WithSlug>(type, 100000, 0)

  return {
    type,
    prefix,
    enumerable
  }
}

export { sitemapFor }
