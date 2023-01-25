import { AstroGlobal } from 'astro'

import { BlogOrPressroom } from '../../../../types/enum'

const landingPage = '/blog/'

const isActive = (Astro: AstroGlobal, filter: Filter): string => {
  const { value } = filter
  const { pathname } = Astro.url

  if (value === undefined) {
    if (pathname === landingPage) {
      return 'on'
    }
  }

  return ['/blog/tag', filter.value, ''].join('/') === pathname ? 'on' : 'off'
}

const hrefFromFilter = (Astro: AstroGlobal, prefix: BlogOrPressroom, filter: Filter, defaultValue?: string): string => {
  const { value } = filter
  const { pathname } = Astro.url

  if (value === undefined && pathname === landingPage) {
    return [landingPage, defaultValue].join('#')
  }

  const tag = value ?? defaultValue as string

  return value !== undefined ? `/${prefix}/tag/${tag}/#${tag}` : [landingPage, defaultValue].join('#')
}

export { hrefFromFilter, isActive }
