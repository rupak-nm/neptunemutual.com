{
  const inputIconContainers = document.querySelectorAll('.input.with.icon')

  inputIconContainers.forEach(inputIconContainer => {
    const inputField = inputIconContainer.querySelector('input')
    const iconButton = inputIconContainer.querySelector('button.icon.button')

    if (iconButton) {
      iconButton.addEventListener('click', () => {
        const shown = inputField.getAttribute('type') === 'text'

        if (shown) inputField.setAttribute('type', 'password')
        else inputField.setAttribute('type', 'text')
      })
    }
  })
}
