import {
  CheerioAPI,
  load
} from 'cheerio'

import * as linkedHeadings from './tasks/linked-headings'
import * as updateEmbeds from './tasks/update-embeds'
import * as updateImages from './tasks/update-images'

const tasks = [updateImages, linkedHeadings, updateEmbeds]

const run = async ($: CheerioAPI): Promise<CheerioAPI> => {
  for (const task of tasks) {
    $ = await task.run($)
  }

  return $
}

const process = async (html: string): Promise<string> => {
  if (html === null || html === undefined) {
    return ''
  }

  const expression = /<p>&nbsp;<\/p>/d
  const $ = await run(load(html.replace(expression, ''), null, false))
  return $.html()
}

export { process, run }
