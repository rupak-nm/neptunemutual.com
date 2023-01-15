{
  function click (event) {
    const mobileNavDropdown = document.querySelector('.mobile.sections.container')
    const button = event.currentTarget

    const state = mobileNavDropdown.getAttribute('data-open')
    const newState = state === 'true' ? 'false' : 'true'

    mobileNavDropdown.setAttribute('data-open', newState)
    button.setAttribute('data-open', newState)
  }

  document.querySelector('.mobile.menu.container')
    .querySelector('button.item.trigger.button')
    .addEventListener('click', click)
}
