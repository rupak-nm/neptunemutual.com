import { Item } from 'feed'

const toFeedItem = (slug: string, page: Article): Item | undefined => {
  try {
    const link = `https://neptunemutual.com/${slug}/${page.slug as string}/`

    const item: Item = {
      title: page.title,
      id: link,
      link,
      date: new Date(page.publishedAt as Date),
      published: new Date(page.publishedAt as Date),
      description: page.intro,
      content: page.contentHtml,
      copyright: `All rights reserved ${new Date().getFullYear()}, Neptune Mutual`,
      image: `https://neptunemutual.com/cdn/images/${page.cover.filename}`,
      author: [{
        name: 'Neptune Mutual',
        link: 'https://neptunemutual.com'
      }]
    }

    return item
  } catch (error) {
    console.error(error)
  }
}

export { toFeedItem }
