import { parse } from './content-viewer/html'
import * as tasks from './content-viewer/tasks'
import * as toc from './content-viewer/toc'
import { fromCdnUnqualified } from './dns'
import { convertWordsToMinutes } from './format'

const getHtml = (content: Content, props: string[]): string => {
  type ObjectKey = keyof typeof content

  for (const prop of props) {
    const html: string = content[prop as ObjectKey] as string

    if (html !== undefined) {
      return html
    }
  }

  return ''
}

const parseContent = async (type: string, htmlProperties: string[], content: Content): Promise<ParsedArticle> => {
  const html: string = getHtml(content, htmlProperties)

  let $ = parse(html)
  const headers = await toc.get($)

  $ = await tasks.run($)
  const parsedHtml = $.html()

  const pageUrl = content?.slug === undefined ? '' : `/${type}/${content?.slug}`
  const timeToRead = convertWordsToMinutes($.text().trim())
  const featuredImage = content.cover === undefined || content.cover === null ? '' : fromCdnUnqualified(content.cover.filename)
  const alt = content.cover === undefined || content.cover === null ? '' : content.cover.alt

  const article: ParsedArticle = {
    parsedHtml,
    pageUrl,
    timeToRead,
    featuredImage,
    alt,
    toc: headers,
    tag: (content.tags != null) && content.tags.length > 1 ? content.tags[0] : undefined,
    ...content
  }

  return article
}

export { parseContent }
