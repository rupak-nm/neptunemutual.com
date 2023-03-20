const [previousButton, nextButton] = document.querySelectorAll('.know.the.characters .pagination button')
const activePage = document.querySelector('.know.the.characters .pagination .active.page')
const totalPages = parseInt(document.querySelector('.know.the.characters .pagination .total.pages').innerText)

const hideAllPages = () => {
  const pages = document.querySelectorAll('.know.the.characters .character.page')

  for (const page of pages) {
    page.classList.add('hidden')
  }
}

const showPage = (page) => {
  const characterPage = document.querySelector('.know.the.characters .character.page.page-' + page)
  characterPage.classList.remove('hidden')
  activePage.textContent = page
}

const getCurrentPage = () => {
  return parseInt(activePage.innerText)
}

previousButton.addEventListener('click', () => {
  const currentPage = getCurrentPage()

  if (currentPage - 1 === 1) {
    previousButton.disabled = true
  }

  nextButton.disabled = false

  hideAllPages()
  showPage(currentPage - 1)
})

nextButton.addEventListener('click', () => {
  const currentPage = getCurrentPage()

  if (currentPage + 1 === totalPages) {
    nextButton.disabled = true
  }

  previousButton.disabled = false

  hideAllPages()
  showPage(currentPage + 1)
})
