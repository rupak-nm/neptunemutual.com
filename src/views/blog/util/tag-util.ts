import { AstroGlobal } from 'astro'

const landingPage = '/blog'

const isActive = (Astro: AstroGlobal, filter: Filter): string => {
  const { value } = filter
  const { pathname } = Astro.url

  if (value === undefined) {
    if (pathname === landingPage) {
      return 'on'
    }
  }

  return ['/blog/tag', filter.value].join('/') === pathname ? 'on' : 'off'
}

const toHref = (Astro: AstroGlobal, filter: Filter): string => {
  const { value } = filter
  const { pathname } = Astro.url

  if (value === undefined && pathname === landingPage) {
    return ''
  }

  return value !== undefined ? `/blog/tag/${value}` : landingPage
}

export { isActive, toHref }
