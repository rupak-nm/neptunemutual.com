import { qualifyURL } from '../../../../util/dns'
import * as dynamic from './dynamic'
import pages from './pages.json'
import { persist } from './storage'

const generate = async (): Promise<void> => {
  const fromDb = await dynamic.get()
  const result = [...pages, ...fromDb] as SitemapItem[]

  for (const item of result) {
    item.loc = qualifyURL(item.loc, 'https://neptunemutual.com')
  }

  await persist(result)
}

export { generate }
