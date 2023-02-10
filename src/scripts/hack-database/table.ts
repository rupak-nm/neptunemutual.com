
import { debounce } from '../../../util/debounce'
import { getNumericDate } from '../../../util/format'
import { getPagination } from '../../../util/pagination'
import { stripTags } from '../../../util/strip-tags'
import { chainIconMapping } from '../../data/chain-icon-mapping'

let togglers: NodeListOf<Element> | [] = []

const setupTogglers = (): void => {
  togglers = document.querySelectorAll('td[data-index]')
  // Add event listeners to fire confetti when a button is clicked.
  togglers.forEach((toggler) => {
    toggler.addEventListener('click', () => {
      toggler.classList.toggle('inverted')
      toggleDescription((toggler as HTMLElement).dataset.index ?? '')
    })
  })
}

const getTextNodeHeight = (textNode: Node): number => {
  let height = 0
  const range = document.createRange()
  range.selectNodeContents(textNode)
  const rect = range.getBoundingClientRect()
  height = rect.bottom - rect.top
  return height
}

const toggleDescription = (index: string): void => {
  const descriptionRow = document.querySelector(`tr[data-index="${index}"]`)
  const togglerRow = document.querySelector(`td[data-index="${index}"]`)

  if (descriptionRow?.classList.contains('hidden') ?? false) {
    const descriptionRows = document.querySelectorAll('tr[data-index]')

    descriptionRows.forEach((row) => {
      row.classList.add('hidden')
    })

    togglers.forEach((row) => {
      row.classList.remove('inverted')
    })

    togglerRow?.classList.add('inverted')
    descriptionRow?.classList.remove('hidden')
  } else {
    descriptionRow?.classList.add('hidden')
    return
  }

  const descriptionWrapper = descriptionRow?.querySelector(
    '.description.wrapper'
  )

  const descriptionContent = descriptionWrapper?.querySelector('.description.content');

  (descriptionWrapper as HTMLElement).style.height = `${getTextNodeHeight(descriptionContent?.firstChild as Node)}px`
}

const availableChainIcons = Object.keys(chainIconMapping)

const renderers: Record<string, (hack: Hack) => string> = {
  Name: (hack: Hack) => hack.name,
  Date: (hack: Hack) => getNumericDate(new Date(hack.date).toUTCString()),
  'Amount Lost': (hack: Hack) => hack.amountLost,
  Chains: (hack: Hack) => `
  <div class="chain icon group">
    ${hack.chains.length === 0 ? '-' : ''}
    ${hack.chains.map(c => c.shortName).map((name) =>
    availableChainIcons.includes(name)
      ? (
        `<i class="${name.toLowerCase() + ' chain icon'}" title="${name}"></i>`
      )
      : (
        `<div class="random chain icon" title="${name}">${name[0]}</div>`
      )
  ).join('\n')
    }
  </div>
  `,
  Technique: (hack: Hack) => hack.techniques,
  Description: (hack: Hack) => hack.description ?? '',
  Link: (hack: Hack) => hack.link
}

const columns = Object.keys(renderers)

const isDescription = (col: string): boolean => col === 'Description'
const isLink = (col: string): boolean => col === 'Link'

const getTableRows = (hacks: Hack[]): string =>
  hacks
    .map(
      (hack, index) => `
              <tr>
                ${columns
          .map((column) => {
            if (isDescription(column)) {
              return `<td data-index="${index}">
                  <i class="icon chevron down" />
                </td>`
            }

            if (isLink(column)) {
              return `<td>
                        <a href="${renderers[column](hack)}" target="_blank">
                          <i class="icon external link"></i>
                        </a>
                      </td>`
            }

            return `<td>
                <span>${renderers[column](hack)}</span>
              </td>`
          })
          .join('\n')}
              </tr>
              <tr class="description initially hidden" data-index="${index}">
                <td colspan="${columns.length}">
                  <div class="description wrapper">
                    <div
                      class="description content">
                      ${stripTags(hack.description ?? '')}
                    </div>
                  </div>
                </td>
              </tr>
`
    )
    .join('\n')

const filterHackData = async (
  page?: string | number,
  initial: boolean = false
): Promise<void> => {
  try {
    const table = document.querySelector('table')

    const tbody = table?.querySelector('tbody')
    const tablePrefixHeader = document.querySelector('.prefix.header')
    const hackCounter = document.querySelector('.hack.counter')
    page = page != null ? page : (table?.dataset.page)

    const currentSortKey = table?.dataset.sortKey ?? ''

    const searchQuery = (document.querySelector('.hack.search.input input') as HTMLInputElement).value.trim()

    const response = await (
      await fetch(
        // eslint-disable-next-line
        (import.meta as any).env.PUBLIC_HACKS_API_ORIGIN + `?limit=20&page=${(page ?? 1).toString()}${currentSortKey.length !== 0 ? '&sort=' + currentSortKey : ''
        }${searchQuery.length > 0
          ? '&' +
          'where[or][0][techniques][like]=' + searchQuery +
          '&' +
          'where[or][1][name][like]=' + searchQuery
          : ''
        }`
      )
    ).json()

    const html = getTableRows(response.docs)

    if (tbody != null && table != null && hackCounter != null) {
      tbody.innerHTML = html

      table.dataset.page = response.page
      hackCounter.innerHTML = response.totalDocs
    }

    setupTogglers()
    setupPagination(response.totalPages, response.page)

    if (!initial && tablePrefixHeader != null) {
      tablePrefixHeader.scrollIntoView({ behavior: 'smooth' })
    }
  } catch (err) {
    console.log(err)
  }
}

let previousPageEventListener: EventListener

let nextPageEventListener: EventListener

const setupPagination = (totalPages: number, currentPage: number): void => {
  const pagination = getPagination(totalPages, currentPage)

  const pagesHtml = pagination
    .pages?.map((page) => {
      return page != null
        ? `<a class="ui page link color button${page === currentPage ? ' active' : ''}" href="#/">
              <span class="content">
                ${page}
              </span>
            </a>`
        : '<span class="continues"> ... </span>'
    })
    .join('\n') ?? ''

  const pageNumbers = document.querySelector('.page.numbers')

  if (pageNumbers != null) {
    pageNumbers.innerHTML = pagesHtml
  }

  const previousPage = document.querySelector('.previous.page')
  const nextPage = document.querySelector('.next.page')

  const table = document.querySelector('table')

  if (previousPage != null) {
    if (pagination.previous != null) {
      previousPage.removeAttribute('data-disabled')
    } else {
      previousPage.setAttribute('data-disabled', 'true')
    }
  }

  if (nextPage != null) {
    if (pagination.next != null) {
      nextPage.removeAttribute('data-disabled')
    } else {
      nextPage.setAttribute('data-disabled', 'true')
    }
  }

  const pages = document.querySelectorAll('.page')

  if (previousPageEventListener != null && previousPage != null) {
    previousPage.removeEventListener('click', previousPageEventListener)
  }

  if (nextPageEventListener != null && nextPage != null) {
    nextPage.removeEventListener('click', nextPageEventListener)
  }

  previousPageEventListener = (e: Event) => {
    e.preventDefault()

    if (pagination.previous != null) {
      filterHackData(parseInt(table?.dataset.page ?? '2') - 1).catch(console.log)
    }
  }

  nextPageEventListener = (e: Event) => {
    e.preventDefault()

    if (pagination.next != null) {
      filterHackData(parseInt(table?.dataset.page ?? '0') + 1).catch(console.log)
    }
  }

  if (previousPage != null) {
    previousPage.addEventListener('click', previousPageEventListener)
  }

  if (nextPage != null) {
    nextPage.addEventListener('click', nextPageEventListener)
  }

  pages.forEach((page) => {
    page.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()
      if (
        !page.classList.contains('next') &&
        !page.classList.contains('previous')
      ) {
        filterHackData(parseInt(page.textContent ?? '1')).catch(console.log)
      }
    })
  })
}

let previousSearchQuery: string | undefined

const setupDebounce = (): void => {
  const input = document.querySelector('.hack.search.input')

  const inputDebounce = debounce((searchQuery: string) => {
    if (previousSearchQuery !== searchQuery) {
      previousSearchQuery = searchQuery
      filterHackData(1).catch(console.log)
    }
  }, 500)

  const onKeyup: EventListener = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value
    inputDebounce(inputValue)
  }

  input?.addEventListener('keyup', onKeyup)
}

const setupSorting = (): void => {
  const buttons = document.querySelectorAll('button[data-sorting-key]')
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const sortingKey = (btn as HTMLButtonElement).dataset.sortingKey ?? ''

      const table = document.querySelector('table')
      const currentSortKey = table?.dataset.sortKey ?? ''

      let newSortKey = ''

      if (currentSortKey.includes(sortingKey)) {
        // Same Key Clicked
        if (currentSortKey.includes('-')) {
          newSortKey = currentSortKey.replace('-', '')
          btn.classList.remove('desc')
        } else {
          newSortKey = '-' + currentSortKey
          btn.classList.add('desc')
        }
      } else {
        newSortKey = '-' + sortingKey
        buttons.forEach((b) => b.classList.remove('desc'))
        btn.classList.add('desc')
      }

      if (table != null) {
        table.dataset.sortKey = newSortKey
      }

      filterHackData(1).catch(console.log)
    })
  })
};

// self executing function here
(function () {
  setupTogglers()
  filterHackData(1, true).catch(console.log)
  setupDebounce()
  setupSorting()
})()
