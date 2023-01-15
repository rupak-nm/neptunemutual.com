import { CheerioAPI } from 'cheerio'

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

export { run }
