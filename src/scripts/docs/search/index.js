import { compose } from '../dom'
import { find } from './find'

const OFFSET = 100

const search = (searchTerm) => {
  document.querySelector('.search.result').innerHTML = ''

  if (!searchTerm || searchTerm.length < 4) {
    return
  }

  const results = find(searchTerm)

  if (!results) {
    return
  }

  for (const result of results) {
    const text = result.text

    const pos = text.toLowerCase().indexOf(searchTerm.toLowerCase())
    const start = text.substring(0, pos - OFFSET).split(' ').slice(0, -1).join(' ').length
    const end = text.substring(0, pos + OFFSET).split(' ').slice(0, -1).join(' ').length + 1

    const pattern = new RegExp(searchTerm, 'd')
    const html = text
      .substring(start, end)
      .replace(pattern, `<span class='match'>${searchTerm}</span>`) + ' ...'

    compose('#', result.title, html)
  }
}

export { search }
