import path from 'path'

import { saveToDiskRaw } from '../../../../util/io'
import { serialize } from './serializer'

const file = path.join(process.cwd(), 'public/sitemap.xml')

const persist = async (urls: SitemapItem[]): Promise<void> => {
  const sitemap = await serialize(urls)

  await saveToDiskRaw(file, sitemap)
}

export { persist }
