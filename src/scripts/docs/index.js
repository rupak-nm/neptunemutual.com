// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'
import './sidebar'

import '../global/search'

import hljs from 'highlight.js'

import mediumZoom from '../utils/image-zoom.min'

{
  const images = [
    ...document.querySelectorAll('.story .content img')
  ]

  mediumZoom(images)
}

;(function () {
  hljs.highlightAll()
})()
