import { CheerioAPI } from 'cheerio'

const tags = [
  ['h2', 2],
  ['h3', 3],
  ['h4', 4],
  ['h5', 5],
  ['h6', 5]
]

const get = async ($: CheerioAPI): Promise<TableOfContentEntry[]> => {
  const selectors = 'h2, h3, h4, h5, h6'
  const elements = $(selectors)

  const toc: TableOfContentEntry[] = []

  elements.each(function () {
    const { tagName } = this

    const id = $(this).attr('id')
    const [text] = $(this).text().split('#')

    for (const tag of tags) {
      const [name, type] = tag

      if (tagName === name) {
        toc.push({ text, id: id ?? '', type: parseInt(type.toString()) })
      }
    }
  })

  return toc
}

export { get }
