// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'

import { getDocs } from './request'
import { search } from './search'
import mediumZoom from '../utils/image-zoom.min'

import hljs from 'highlight.js'

const key = 'docs__cache'

const onActivate = async () => {
  document.querySelector('.dimmer').classList.toggle('hidden')
  window.docs = await getDocs(key)
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
  console.log('test')
  hljs.highlightAll()
})()
