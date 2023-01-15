import { CheerioAPI } from 'cheerio'

const run = ($: CheerioAPI): CheerioAPI => {
  $('h2, h3, h4, h5, h6').each(function () {
    const el = $(this)

    const id = el.attr('id')

    const text = el.text().trim()
    el.text(text)

    if (id === undefined || id === null) {
      return
    }

    el.append(`<a aria-label="Direct link to heading" class="heading-anchor" href="#${id}">#</a>`)
  })

  return $
}

export { run }
