import Enumerable from 'linq'

const getPagination = (totalPages?: number, currentPage?: number): PaginationResult => {
  if (totalPages === null || totalPages === undefined) {
    return {
      previous: undefined,
      pages: undefined,
      next: undefined
    }
  }

  if (currentPage === null || currentPage === undefined) {
    currentPage = 1
  }

  /**
   * @warning: although the types were said to be a number in the above line,
   * Typescript doesn't enforce this. Numbers passed as an Astro prop are
   * silently boxed as string.
   */
  totalPages = +totalPages
  currentPage = +currentPage
  /**
   * Don't change the above lines
   */

  if (currentPage > totalPages) {
    currentPage = totalPages
  }

  const start = currentPage - 3 > 3 ? currentPage - 2 : currentPage
  const end = currentPage + 3 < totalPages ? currentPage + 2 : totalPages
  const count = end - start + 1

  const pages: Array<number | null> = Enumerable.range(start, count).toArray()

  if (end < totalPages - 1) {
    pages.push(...[null, totalPages])
  }

  if (currentPage - 3 < 5) {
    const left = Enumerable.range(1, currentPage - 1).toArray()
    pages.unshift(...left)
  }

  if (currentPage - 3 >= 5) {
    pages.unshift(1, null)
  }

  const previous = currentPage === 1 ? undefined : currentPage - 1
  const next = currentPage === totalPages ? undefined : currentPage + 1

  return { previous, pages, next }
}

export { getPagination }
