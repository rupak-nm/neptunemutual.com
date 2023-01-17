import { addAnalytics } from './analytics'

const cookieAcceptButton = document.querySelector('.cookie.popup .accept.button')
const cookieDeclineButton = document.querySelector('.cookie.popup .decline.button')
const cookieCloseButton = document.querySelector('.cookie.popup .close.button')
const popup = document.querySelector('.cookie.popup.container')

function showPopup () {
  if (!popup) return

  popup.classList.remove('initially', 'hidden')
}

function hidePopup () {
  if (!popup) return

  popup.classList.add('initially', 'hidden')
}

function checkConsentOnLoad () {
  const cookiesAccepted = window.localStorage.getItem('npm-cookies-accepted')

  if (cookiesAccepted === 'true') {
    addAnalytics()
  }

  if (cookiesAccepted === 'false' || cookiesAccepted === 'true') {
    hidePopup()
    return
  }

  showPopup()
}

checkConsentOnLoad()

function setNpmCookie (value) {
  if (value !== 'true' && value !== 'false') return

  window.localStorage.setItem('npm-cookies-accepted', value)
  hidePopup()
}

cookieAcceptButton.addEventListener('click', () => setNpmCookie('true'))
cookieDeclineButton.addEventListener('click', () => setNpmCookie('false'))
cookieCloseButton.addEventListener('click', () => hidePopup())
