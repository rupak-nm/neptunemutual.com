
const cache = (docs, key) => {
  const value = {
    on: new Date().getTime(),
    docs
  }

  localStorage.setItem(key, JSON.stringify(value))
}

const fromCache = (key) => {
  const content = localStorage.getItem(key)

  if (content) {
    return JSON.parse(content)
  }

  return null
}

export { cache, fromCache }
