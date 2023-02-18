import {
  del,
  get,
  set
} from 'idb-keyval'

const cache = async (data, key, expires) => {
  const value = {
    expires,
    data
  }

  await set(key, JSON.stringify(value))
}

const fromCache = async (key) => {
  const content = await get(key)

  if (content) {
    const { data, expires } = JSON.parse(content)

    if (expires < new Date().getTime()) {
      console.debug('Cache expired')
      await emptyCache(key)
    }

    return data
  }

  return null
}

const emptyCache = async (key) => {
  await del(key)
}

export { cache, emptyCache, fromCache }
