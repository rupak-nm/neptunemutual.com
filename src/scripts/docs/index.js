// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'
import './sidebar'

import hljs from 'highlight.js'

import mediumZoom from '../utils/image-zoom.min'
import { getDocs } from './request'
import { search } from './search'

import { copyToClipboard } from '../../../util/copy'

const key = 'docs__cache'

const searchOverlay = document.querySelector('.search.dimmer')
const searchInputField = document.getElementById('ModalSearchInputSearch')
const inputClearButton = document.querySelector('#ModalSearchInputSearch + button.clear')

const onActivate = async () => {
  searchOverlay.classList.toggle('hidden')
  window.docs = await getDocs(key)

  searchInputField.focus()

  searchOverlay.addEventListener('click', handleClick)

  // disable page scrolling
  document.querySelector('html body').classList.add('no', 'vertical', 'scroll')
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
  search(term)
  updateCopyButtons()
}

const onClear = () => {
  searchInputField.value = ''
  searchInputField.focus()
  search()
}

document.getElementById('SearchInputSearch').addEventListener('focus', onActivate, { passive: true })
searchInputField.addEventListener('input', onSearch, { passive: true })
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

{
  const images = [
    ...document.querySelectorAll('.story .content img')
  ]

  mediumZoom(images)
}

;(function () {
  hljs.highlightAll()
})()
