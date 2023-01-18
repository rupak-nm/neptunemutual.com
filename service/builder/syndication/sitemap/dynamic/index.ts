import * as enumerable from './enumerable'

const get = async (): Promise<SitemapItem[]> => {
  console.time('Sitemap')
  const result = []

  const items = await enumerable.resolve()

  for (const item of items) {
    const { enumerable, prefix } = item

    for (const entry of enumerable) {
      const { slug } = entry
      result.push({ loc: `/${prefix}/${slug}/` })
    }
  }

  console.timeEnd('Sitemap')
  return result
}

export { get }
