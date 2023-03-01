import {
  AnyNode,
  CheerioAPI
} from 'cheerio'
import { slugify } from 'transliteration'

const run = ($: CheerioAPI): CheerioAPI => {
  const getId = (el: AnyNode): string => {
    const header = $(el)

    const id = header.attr('id')

    const text = header.text().trim()
    header.text(text)

    if (id === undefined || id === null) {
      const text = header.text()
      const slugified = slugify(text)
      header.attr('id', slugified)

      return slugified
    }

    return id
  }

  $('h1, h2, h3, h4, h5, h6').each(function () {
    const id = getId(this)
    $(this).append(`<a aria-label="Direct link to heading" class="heading anchor" href="#${id}">#</a>`)
  })

  return $
}

export { run }
