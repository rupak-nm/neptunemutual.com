import {
  cache,
  emptyCache,
  fromCache
} from './cache'

const key = 'docs__cache'
const SECONDS = 100
const DAYS = 24 * 60 * 60 * SECONDS
const expires = 7 * DAYS

const request = async () => {
  try {
    const content = await fetch('/cache/docs.json')
    const { docs } = await content.json()

    return docs.map((x) => {
      return {
        title: x.title,
        subtitle: x.subtitle,
        text: x.htmlAsText,
        slug: x.slug,
        parent: x.parent?.slug
      }
    })
  } catch (error) {
    console.error('Could not get docs')
  }

  return null
}

const getDocs = async () => {
  const cached = await fromCache(key)

  if (!cached) {
    console.log('Cache is empty. Requesting a copy.')
    const docs = await request()

    console.log('Request successful. Caching this response.')
    await cache(docs, key)

    return docs
  }

  const { on, docs } = cached

  if (on + expires < new Date().getTime()) {
    await emptyCache(key)
    console.log('The cache has expired. Reset complete.')
  }

  return docs
}

export { getDocs }
