import {
  currentLocale,
  localeNames
} from '../../../../util/locale.ts'

const languageDropdowns = document.querySelectorAll(
  '.language.select.container div.dropdown.container'
)
const toggleButtons = document.querySelectorAll(
  '.language.select.container button.toggle'
)
const backButtons = document.querySelectorAll(
  '.language.select.container .back.button'
)

function handleDocumentClick (e) {
  if (!e.target.closest('.language.dropdown.container')) {
    hideDropdown()
  }
}

function hideDropdown () {
  languageDropdowns.forEach((languageDropdown) => {
    languageDropdown.setAttribute('data-open', 'false')
  })

  toggleButtons.forEach((toggleButton) => {
    toggleButton.setAttribute('data-open', 'false')
  })

  updateInputFields()
  updateOptions()

  document.removeEventListener('click', handleDocumentClick)
}

function showDropdown () {
  languageDropdowns.forEach((languageDropdown) => {
    languageDropdown.setAttribute('data-open', 'true')
  })

  toggleButtons.forEach((toggleButton) => {
    toggleButton.setAttribute('data-open', 'true')
  })

  document.addEventListener('click', handleDocumentClick)
}

toggleButtons.forEach((toggleButton) => {
  toggleButton.addEventListener('click', (e) => {
    e.stopPropagation()
    const state = e.currentTarget?.getAttribute('data-open')
    const newState = state === 'true' ? 'false' : 'true'
    newState === 'true' ? showDropdown() : hideDropdown()
  })
})

backButtons.forEach((backButton) => {
  backButton.addEventListener('click', (e) => {
    hideDropdown()
  })
})

// handle input change & filtering
const inputs = document.querySelectorAll('.language.select.container input')
const listItems = document.querySelectorAll('.language.select.container ul.options > li')
const noDataItems = document.querySelectorAll('.language.select.container ul.options > li[data-value="no-match"]')

const languages = Object.keys(localeNames).map(key => ({ [key]: localeNames[key] }))

function updateInputFields (val = '') {
  inputs.forEach(input => {
    input.value = val
  })
}

function updateOptions (val = '') {
  const filtered = languages.filter(lang => {
    const _val = Object.values(lang)[0].toLowerCase()
    if (_val.includes(val)) return true
    return false
  })
  const filteredArray = filtered.map(f => Object.keys(f)[0]).filter(f => f !== currentLocale)

  listItems.forEach(listItem => {
    const key = listItem.getAttribute('data-value')
    const show = filteredArray.includes(key) ? 'true' : 'false'
    listItem.setAttribute('data-show', show)
  })

  updateInputFields(val)

  const showNoDataItem = filteredArray.length ? 'false' : 'true'
  noDataItems.forEach(noDataItem => {
    noDataItem.setAttribute('data-show', showNoDataItem)
  })
}

inputs.forEach(input => {
  input.addEventListener('input', e => {
    const val = e.target.value.toLowerCase()
    updateOptions(val)
  })
})
