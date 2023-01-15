import transliteration from 'transliteration'

const noise: Array<[RegExp, string]> = [
  [/'/g, ''],
  [/`/g, ''],
  [/’/g, ''],
  [/“/g, ''],
  [/”/g, ''],
  [/_/g, ' '],
  [/\./g, ' ']
]

const removeNoise = (text: string): string => {
  if (text === null || text === undefined) {
    return ''
  }

  for (const candidate of noise) {
    const [find, replace] = candidate
    text = text.replace(find, replace)
  }

  return text
}

const slugify = (text: string): string => {
  return transliteration.slugify(removeNoise(text)).replace(/-+/g, '-')
}

export { slugify }
