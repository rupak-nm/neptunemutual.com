import { DOCS_IDBVALIDKEY } from '../global/search/constant'

function debounce (func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

const getIDBValidKey = () => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/docs')) {
    return DOCS_IDBVALIDKEY
  }
}

const getCacheUrl = () => {
  const pathname = window.location.pathname

  if (pathname.startsWith('/docs')) {
    return '/cache/docs.json'
  }
}

export { debounce, getIDBValidKey, getCacheUrl }
