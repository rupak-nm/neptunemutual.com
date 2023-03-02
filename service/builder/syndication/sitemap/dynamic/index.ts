import * as enumerable from './enumerable'

const get = async (): Promise<SitemapItem[]> => {
  const result = []

  const items = await enumerable.resolve()

  for (const item of items) {
    const { enumerable, prefix } = item

    for (const entry of enumerable) {
      const { slug } = entry
      result.push({ loc: `/${prefix}/${slug}/` })
    }
  }

  return result
}

export { get }
