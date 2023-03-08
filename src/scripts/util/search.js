import { DOCS_IDBVALIDKEY, BLOG_IDBVALIDKEY } from '../global/search/constant'

function debounce (func, timeout = 300) {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => { func.apply(this, args) }, timeout)
  }
}

const pathname = window.location.pathname
const isDocsPage = pathname.startsWith('/docs')
const isBlogPage = pathname.startsWith('/blog')

const getIDBValidKey = () => {
  if (isDocsPage) {
    return DOCS_IDBVALIDKEY
  }

  if (isBlogPage) {
    return BLOG_IDBVALIDKEY
  }
}

const getCacheUrl = () => {
  if (isDocsPage) {
    return '/cache/docs.json'
  }

  if (isBlogPage) {
    return '/cache/blog.json'
  }
}

const getRootPath = () => {
  if (isDocsPage) return '/docs'
  if (isBlogPage) return '/blog'
}

export { debounce, getIDBValidKey, getCacheUrl, getRootPath }
