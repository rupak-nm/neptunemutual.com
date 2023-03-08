import { compose } from './dom'
import { find } from './find'
const OFFSET = 100

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
    if (!text) return

    const url = ['/docs', result.parent, result.slug].filter(x => x !== undefined).join('/')

    const pos = text.toLowerCase().indexOf(searchTerm.toLowerCase())
    const start = text.substring(0, pos - OFFSET).split(' ').slice(0, -1).join(' ').length
    const end = text.substring(0, pos + OFFSET).split(' ').slice(0, -1).join(' ').length + 1

    const pattern = new RegExp(`(${searchTerm})`, 'i')
    const html = text
      .substring(start, end)
      .replace(pattern, '<span class=\'match\'>$1</span>') + ' ...'

    compose(url, result.title, html)
  }
}

export { search }
