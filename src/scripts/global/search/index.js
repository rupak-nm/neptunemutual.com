import { search } from './search'

import { copyToClipboard } from '../../util/copy'
import { debounce } from '../../util/search'

const searchOverlay = document.querySelector('.search.dimmer')
const searchInputField = document.getElementById('ModalSearchInputSearch')
const inputClearButton = document.querySelector('#ModalSearchInputSearch + button.clear')

function handleKeyDown (e) {
  if ((e.key === 'Escape' || e.which === 27) && !searchInputField.value) {
    searchOverlay.classList.add('hidden')
    document.removeEventListener('keydown', handleKeyDown)
  }
}

const onActivate = async () => {
  searchOverlay.classList.toggle('hidden')

  searchInputField.focus()

  searchOverlay.addEventListener('click', handleClick)

  // disable page scrolling
  document.querySelector('html body').classList.add('no', 'vertical', 'scroll')

  document.addEventListener('keydown', handleKeyDown)
}

function handleClick (e) {
  const clickedOutside = !e.target.closest('.ui.search.modal')

  if (clickedOutside) {
    searchOverlay.classList.add('hidden')
    searchOverlay.removeEventListener('click', handleClick)

    // enable page scrolling
    document.querySelector('html body').classList.remove('no', 'vertical', 'scroll')
  }
}

const onSearch = async (e) => {
  const { srcElement } = e
  const term = srcElement.value.trim()
  await search(term)
  updateCopyButtons()
}

const debouncedOnSearch = debounce(onSearch)

const onClear = () => {
  searchInputField.value = ''
  searchInputField.focus()
  search()
}

document.getElementById('SearchInputSearch').addEventListener('focus', onActivate, { passive: true })
searchInputField.addEventListener('input', debouncedOnSearch, { passive: true })
inputClearButton.addEventListener('click', onClear, { passive: true })

function updateCopyButtons () {
  const copyButtons = document.querySelectorAll('.search.result .item > .footer button.copy')

  const handleCopy = e => {
    const href = e.target.nextSibling.getAttribute('href')
    copyToClipboard(`${window.location.origin}${href}`)
  }

  copyButtons.forEach(copyButton => {
    copyButton.addEventListener('click', handleCopy)
  })
}
