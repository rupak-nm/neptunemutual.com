const darkModeInputCheckboxes = document.querySelectorAll('#DarkModeInputCheckbox')

const switchTheme = async () => {
  const theme = window.getTheme()
  const switchTo = theme === 'dark' ? 'light' : 'dark'

  window.localStorage.setItem('theme', switchTo)

  darkModeInputCheckboxes.forEach(async (darkModeInputCheckbox) => {
    await window.loadTheme(darkModeInputCheckbox)
  })
}

const theme = window.getTheme()

darkModeInputCheckboxes.forEach(darkModeInputCheckbox => {
  darkModeInputCheckbox.checked = theme === 'dark'

  darkModeInputCheckbox.addEventListener('click', switchTheme, { passive: true })
})
