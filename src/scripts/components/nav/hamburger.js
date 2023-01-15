{
  function click (event) {
    event.stopPropagation()

    const mobileMenu = document.getElementById('MobileMenu')
    const openState = mobileMenu.getAttribute('data-open')
    const newState = openState === 'true' ? 'false' : 'true'

    mobileMenu.setAttribute('data-open', newState)
    event.currentTarget.setAttribute('data-open', newState)
  }

  document.addEventListener('click', (e) => {
    const mobileMenu = document.querySelector('#MobileMenu[data-open="true"]')
    const button = document.querySelector(
      '.hamburger.button.container[data-open]'
    )
    if (!mobileMenu) return

    if (!e.target.closest('#MobileMenu')) {
      mobileMenu.setAttribute('data-open', 'false')
      button.setAttribute('data-open', 'false')
    }
  })

  document.querySelector('button.hamburger.button.container').addEventListener('click', click)
}
