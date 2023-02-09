const convertSecondsToWords = (units: number): { formatted: string, text: string } => {
  const hours = Math.floor(units / 60 / 60)
  const minutes = Math.floor(units / 60) - (hours * 60)
  const seconds = units % 60

  const formatted = [hours > 0 && hours, minutes, seconds].filter(x => x !== false).map(x => x.toString().padStart(2, '0')).join(':')

  return {
    formatted,
    text: (hours > 0 ? hours.toString() + ' hours, ' : '') + minutes.toString() + ' minutes, ' + seconds.toString() + ' seconds'
  }
}

const convertWordsToMinutes = (text: string): number => {
  try {
    const wordPerMinute = 225

    const words = text.trim().split(/\s+/).length

    return Math.ceil(words / wordPerMinute)
  } catch (error) {

  }

  return 0
}

const getFormattedDate = (x: string): string => {
  // Safari doesn't like dashes
  const normalized = x.replace(/-/g, '/')

  const code = 'en'

  return new Date(normalized).toLocaleDateString(code, {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: '2-digit'
  })
}

const getNumericDate = (x: string): string => {
  // Safari doesn't like dashes
  const normalized = x.replace(/-/g, '/')

  const date = new Date(normalized)

  const yyyy = date.getFullYear()
  let mm: number | string = date.getMonth() + 1 // Months start at 0!
  let dd: number | string = date.getDate()

  if (dd < 10) dd = '0' + dd.toString()
  if (mm < 10) mm = '0' + mm.toString()

  const numericDate = (dd as string) + '/' + (mm as string) + '/' + yyyy.toString()

  return numericDate
}

export { convertSecondsToWords, convertWordsToMinutes, getFormattedDate, getNumericDate }
