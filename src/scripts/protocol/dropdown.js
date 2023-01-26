{
  const toggleButton = document.getElementById('NetworkSelectButton')
  const menu = document.querySelector('#NetworkSelectButton + .menu[data-open]')

  toggleButton.addEventListener('click', () => {
    const currentState = menu.getAttribute('data-open')
    const newState = currentState === 'true' ? 'false' : 'true'
    menu.setAttribute('data-open', newState)
  })
}
