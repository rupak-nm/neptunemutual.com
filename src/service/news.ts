import { slugify } from '../../util/slug'

const asPost = (newsItem: NewsItem): Content => {
  const tag: Tag = {
    id: newsItem.press.id,
    name: newsItem.press.name,
    slug: slugify(newsItem.press.name),
    color: newsItem.press.badge
  }

  const content: Content = {
    tags: [tag],
    ...newsItem
  }

  return content
}

export { asPost }
