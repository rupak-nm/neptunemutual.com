export const getBrowserLocale = (): string => {
  const fallback = 'en'

  try {
    return (
      navigator?.userLanguage ||
      (navigator.languages &&
        (navigator.languages.length > 0) &&
        navigator.languages[0]) ||
      navigator.language ||
      navigator.browserLanguage ||
      navigator.systemLanguage ||
      fallback
    )
  } catch {
    // `navigator` is not available
  }

  return fallback
}

export const localeNames: Record<string, string> = {
  en: 'English',
  zh: 'Chinese - 中文'
  // fr: 'French - français',
  // de: 'German - Deutsch',
  // id: 'Indonesian - Bahasa Indonesia',
  // it: 'Italian - italiano',
  // ja: 'Japanese - 日本語',
  // ko: 'Korean - 한국어',
  // ru: 'Russian - русский',
  // es: 'Spanish - Español',
  // el: 'Greek - Ελληνικά',
  // tr: 'Turkish - Türkçe',
  // vi: 'Vietnamese - Tiếng Việt'
}

export const availableLocales: string[] = [
  ...Object.keys(localeNames)
]

export const currentLocale = getBrowserLocale()
