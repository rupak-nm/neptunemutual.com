import { CheerioAPI } from 'cheerio'

import { fromCdnUnqualified } from '../../dns'
import { env } from '../../env'

const origins = env('IMAGE_ORIGINS').split(',').map(x => x.trim())
const fromKnownOrigins = (src: string): boolean => origins.find(x => new URL(x).origin === new URL(src, x).origin) !== undefined

const rewriteMedia = (src: string): string => {
  const filename = src.replace('/media/', '')
  return fromCdnUnqualified(filename)
}

const rewrite = (src: string): string => {
  if (src.startsWith('/media')) {
    return rewriteMedia(src)
  }

  const required = fromKnownOrigins(src)

  if (!required) {
    console.log('Skipped: %s', src)
  }

  const filename = (new URL(src)).pathname.split('/').pop()
  return fromCdnUnqualified(filename)
}

const run = async ($: CheerioAPI): Promise<CheerioAPI> => {
  $('img').each(function () {
    const src = $(this).attr('src')

    if (src === undefined || src === null) {
      return
    }

    const rewritten = rewrite(src)

    console.log('%s --> %s', src, rewritten)

    $(this).attr('src', rewritten)
    $(this).removeAttr('srcset')
    $(this).removeAttr('width')
    $(this).removeAttr('height')
  })

  return $
}

export { run }
