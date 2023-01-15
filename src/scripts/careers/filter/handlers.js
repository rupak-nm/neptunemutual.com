const menu = document.querySelector('.ui.dropdown.filter.container .menu')

const open = () => {
  menu.setAttribute('data-open', 'true')
}

const close = () => {
  menu.setAttribute('data-open', 'false')
}

const toggleDropdown = () => {
  const menuState = menu.getAttribute('data-open')
  menuState === 'true' ? close() : open()
}

export { close, open, toggleDropdown }
