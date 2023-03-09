import { getRootPath, getUpdatedHtml } from '../../util/search'
import { compose } from './dom'
import { find } from './find'

const search = async (searchTerm) => {
  document.querySelector('.search.result').innerHTML = ''

  if (!searchTerm || searchTerm.length < 4) {
    return
  }

  const results = await find(searchTerm)

  if (!results) {
    return
  }

  for (const result of results) {
    const text = result.text
    const subtitle = result.subtitle
    if (!text && !subtitle) return

    const rootPath = getRootPath()
    const url = [rootPath, result.parent, result.slug].filter(x => x !== undefined).join('/')

    const html = getUpdatedHtml([text, subtitle], searchTerm)

    compose(url, result.title, html)
  }
}

export { search }
