const cookieAcceptButton = document.querySelector('.cookie.popup .accept.button')
const cookieDeclineButton = document.querySelector('.cookie.popup .decline.button')
const cookieCloseButton = document.querySelector('.cookie.popup .close.button')

function showPopup () {
  const popup = document.querySelector(
    '.cookie.popup.container.initially.hidden'
  )
  if (popup) {
    popup.classList.remove('initially', 'hidden')
  }
}

function hidePopup () {
  const popup = document.querySelector('.cookie.popup.container')
  if (popup) {
    popup.classList.add('initially', 'hidden')
  }
}

function updateCookiePopup () {
  const cookiesAccepted = window.localStorage.getItem('npm-cookies-accepted')

  if (cookiesAccepted === 'false' || cookiesAccepted === 'true') {
    return hidePopup()
  }

  showPopup()
}

updateCookiePopup()

function setNpmCookie (value) {
  if (value !== 'true' && value !== 'false') return

  window.localStorage.setItem('npm-cookies-accepted', value)
  hidePopup()
}

cookieAcceptButton.addEventListener('click', () => setNpmCookie('true'))
cookieDeclineButton.addEventListener('click', () => setNpmCookie('false'))
cookieCloseButton.addEventListener('click', () => hidePopup())
