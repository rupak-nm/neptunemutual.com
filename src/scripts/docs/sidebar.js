{
  const contentMenuButton = document.querySelector('.docs.content.menu button')
  const sidebar = document.querySelector('.documentation .ui.sidebar.menu[data-open]')
  const sidebarOverlay = document.querySelector('.documentation .dimmer.sidebar')

  const toggleSidebarAndOverlay = () => {
    const currentState = sidebar.getAttribute('data-open')
    const newState = currentState === 'false' ? 'true' : 'false'
    sidebar.setAttribute('data-open', newState)

    sidebarOverlay.classList.toggle('hidden')
  }

  contentMenuButton.addEventListener('click', toggleSidebarAndOverlay)

  sidebarOverlay.addEventListener('click', toggleSidebarAndOverlay)
}
