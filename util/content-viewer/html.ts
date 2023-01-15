import {
  CheerioAPI,
  load
} from 'cheerio'

const parse = (string: string = '<br>'): CheerioAPI => {
  const $ = load(string, null, false)
  return $
}

export { parse }
