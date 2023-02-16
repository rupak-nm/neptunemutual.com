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

const key = 'docs__cache'

const searchOverlay = document.querySelector('.search.dimmer')

const onActivate = async () => {
  searchOverlay.classList.toggle('hidden')
  window.docs = await getDocs(key)

  document.getElementById('ModalSearchInputSearch').focus()

  searchOverlay.addEventListener('click', handleClick)
}

function handleClick (e) {
  const clickedOutside = !e.target.closest('.ui.search.modal')

  if (clickedOutside) {
    searchOverlay.classList.add('hidden')
    searchOverlay.removeEventListener('click', handleClick)
  }
}

const onSearch = async (e) => {
  const { srcElement } = e
  const term = srcElement.value.trim()
  search(term)
}

document.getElementById('SearchInputSearch').addEventListener('focus', onActivate, { passive: true })
document.getElementById('ModalSearchInputSearch').addEventListener('input', onSearch, { passive: true })

{
  const images = [
    ...document.querySelectorAll('.story .content img')
  ]

  mediumZoom(images)
}

;(function () {
  hljs.highlightAll()
})()
