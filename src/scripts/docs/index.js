// Global Start
import '../components/nav/mega-menu'
import '../components/nav/hamburger'
import '../global/cookie'
import '../global/video'
import '../global/index'

import { getDocs } from './request'
import { search } from './search'

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
