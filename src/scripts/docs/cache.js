import {
  del,
  get,
  set
} from 'idb-keyval'

const cache = async (docs, key) => {
  const value = {
    on: new Date().getTime(),
    docs
  }

  await set(key, JSON.stringify(value))
}

const fromCache = async (key) => {
  const content = await get(key)

  if (content) {
    return JSON.parse(content)
  }

  return null
}

const emptyCache = async (key) => {
  await del(key)
}

export { cache, emptyCache, fromCache }
