import { CheerioAPI } from 'cheerio'

import * as request from '../../../service/builder/fetch/request'

const run = async ($: CheerioAPI): Promise<CheerioAPI> => {
  for (const elem of $('a[data-embed-type]')) {
    try {
      const embedType = $(elem).attr('data-embed-type')
      const oEmbed = $(elem).attr('data-oembed')

      if (typeof oEmbed === 'undefined' || oEmbed.trim() === '') {
        continue
      }

      if (embedType === 'twitter') {
        const { string: dataStr } = await request.get(oEmbed, 'twitter', {})
        const data = JSON.parse(dataStr)

        $(elem).replaceWith(data.html)
      }

      if (embedType === 'youtube') {
        console.log(oEmbed)

        const { string: dataStr } = await request.get(oEmbed, 'youtube', {})
        const data = JSON.parse(dataStr)

        $(elem).replaceWith(data.html)
      }

      if (embedType === 'github') {
        $(elem).replaceWith($(`<script src="${oEmbed}" />`))
      }
    } catch (error) {
      // do something with `error`
      console.log('Failed: ', $(elem).attr('data-embed-type'))
      console.log(error)
    }
  }

  return $
}

export { run }
