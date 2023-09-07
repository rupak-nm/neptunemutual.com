import { getPagination } from '../../../../util/pagination'
import { updateCardVisibility } from '../filter/click'

let previousPageEventListener

let nextPageEventListener

const tableHeader = document.querySelector('div.vacancies.table.title')
const table = document.querySelector('table[data-page]')

const setupPagination = (totalPages, currentPage) => {
  const pagination = getPagination(totalPages, currentPage)

  tableHeader.scrollIntoView({ behavior: 'smooth' })

  const pagesHtml = pagination
    .pages?.map((page) => {
      return page != null
        ? `<a class="ui page link pointer color button${page === currentPage ? ' active' : ''}">
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

  previousPageEventListener = (e) => {
    e.preventDefault()

    if (pagination.previous != null) {
      if (table) {
        table.dataset.page = parseInt(table?.dataset.page ?? '2') - 1

        const selected = document.querySelector('.ui.dropdown.filter.container .menu > ul > li[data-selected="true"]')
        updateCardVisibility(selected, true)
        setupPagination(totalPages, Number(table.dataset.page))
      }
    }
  }

  nextPageEventListener = (e) => {
    e.preventDefault()

    if (pagination.next != null) {
      if (table) {
        table.dataset.page = parseInt(table?.dataset.page ?? '0') + 1

        const selected = document.querySelector('.ui.dropdown.filter.container .menu > ul > li[data-selected="true"]')
        updateCardVisibility(selected, true)
        setupPagination(totalPages, Number(table.dataset.page))
      }
    }
  }

  if (previousPage != null) {
    previousPage.addEventListener('click', previousPageEventListener, { passive: true })
  }

  if (nextPage != null) {
    nextPage.addEventListener('click', nextPageEventListener, { passive: true })
  }

  pages.forEach((page) => {
    page.addEventListener('click', (e) => {
      e.preventDefault()
      e.stopPropagation()

      if (
        !page.classList.contains('next') &&
        !page.classList.contains('previous')
      ) {
        if (table) {
          table.dataset.page = parseInt(page.textContent ?? '1')

          const selected = document.querySelector('.ui.dropdown.filter.container .menu > ul > li[data-selected="true"]')
          updateCardVisibility(selected, true)
          setupPagination(totalPages, Number(table.dataset.page))
        }
      }
    }, { passive: true })
  })
}

if (table) {
  setupPagination(table.dataset.total, 1)
}

export { setupPagination }
