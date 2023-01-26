{
  const buttons = document.querySelectorAll('.ecosystem .ui.buttons .button')
  const divs = document.querySelectorAll('.ecosystem div[data-scope]')

  function updateFeatureList (scope) {
    if (!scope) {
      divs.forEach((x) => x.classList.remove('initially', 'hidden'))
      return
    }

    divs.forEach((x) => x.classList.add('initially', 'hidden'))

    document
      .querySelectorAll(`.ecosystem div[data-scope="${scope}"]`)
      .forEach((x) => x.classList.remove('initially', 'hidden'))
  }

  buttons.forEach((el) => {
    el.addEventListener('click', function () {
      const el = this
      buttons.forEach((x) => x.classList.remove('active'))

      el.classList.add('active')

      const { scope } = el.querySelector('[data-scope]').dataset

      updateFeatureList(scope)
    })
  })

  // dropdown logic
  const dropdownButton = document.querySelector(
    '.ecosystem .dropdown button.toggle'
  )
  const dropdownMenu = document.querySelector(
    '.ecosystem .dropdown div.menu'
  )
  const dropdownLists = document.querySelectorAll(
    '.ecosystem .dropdown div.menu ul > li'
  )
  const buttonSpans = document.querySelectorAll(
    '.ecosystem .dropdown button.toggle span[data-tag]'
  )

  // function to toggle the dropdown menu
  function toggleMenu () {
    const state = dropdownMenu.getAttribute('data-open')
    const newState = state === 'true' ? 'false' : 'true'

    dropdownMenu.setAttribute('data-open', newState)
  }

  // click event listener for dropdown toggle button
  dropdownButton.addEventListener('click', toggleMenu)

  // function to update dropdown menu
  function updateDropdownList (e) {
    dropdownLists.forEach((item) => {
      item.setAttribute('data-selected', 'false')
    })

    const selectedItem = e.currentTarget
    selectedItem.setAttribute('data-selected', 'true')
  }

  // function to update the toggle button
  function updateToggleButton (e) {
    const selectedTag = e.currentTarget.getAttribute('data-tag')
    buttonSpans.forEach((span) => {
      const tag = span.getAttribute('data-tag')

      span.setAttribute('data-selected', tag === selectedTag ? 'true' : 'false')
    })
  }

  dropdownLists.forEach((listItem) => {
    listItem.addEventListener('click', (e) => {
      updateDropdownList(e)
      updateToggleButton(e)

      const tag = e.currentTarget.getAttribute('data-tag')
      const scope = tag === 'all' ? '' : tag
      updateFeatureList(scope)

      toggleMenu()
    })
  })
}
