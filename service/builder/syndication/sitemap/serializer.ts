import { toXML } from '../../../../lib/jstoxml'

const serialize = async (urls: SitemapItem[]): Promise<string> => {
  const sitemap: Sitemap = {
    urlset: []
  }

  for (const url of urls) {
    sitemap.urlset.push({ url })
  }

  const xml = toXML(sitemap, {
    header: true
  })

  return xml.replace('urlset', 'urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')
}

export { serialize }
