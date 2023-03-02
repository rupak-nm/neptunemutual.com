import {
  currentLocale,
  localeNames
} from '../../../../util/locale.ts'

const languageDropdown = document.querySelector(
  '.language.select.container div.dropdown.container'
)
const toggleButton = document.querySelector(
  '.language.select.container button.toggle'
)
const backButton = document.querySelector(
  '.language.select.container .back.button'
)

function handleDocumentClick (e) {
  if (!e.target.closest('.language.dropdown.container')) {
    hideDropdown()
  }
}

function hideDropdown () {
  languageDropdown.setAttribute('data-open', 'false')

  toggleButton.setAttribute('data-open', 'false')

  updateInputField()
  updateOptions()

  document.removeEventListener('click', handleDocumentClick)
}

function showDropdown () {
  languageDropdown.setAttribute('data-open', 'true')

  toggleButton.setAttribute('data-open', 'true')

  document.addEventListener('click', handleDocumentClick)
}

toggleButton.addEventListener('click', (e) => {
  e.stopPropagation()
  const state = e.currentTarget?.getAttribute('data-open')
  const newState = state === 'true' ? 'false' : 'true'
  newState === 'true' ? showDropdown() : hideDropdown()
})

backButton.addEventListener('click', (e) => {
  hideDropdown()
})

// handle input change & filtering
const input = document.querySelector('.language.select.container input')
const listItems = document.querySelectorAll('.language.select.container ul.options > li')
const noDataItem = document.querySelector('.language.select.container ul.options > li[data-value="no-match"]')

const languages = Object.keys(localeNames).map(key => ({ [key]: localeNames[key] }))

function updateInputField (val = '') {
  input.value = val
}

function updateOptions (val = '') {
  const filtered = languages.filter(lang => {
    const _val = Object.values(lang)[0].toLowerCase()
    if (_val.includes(val)) return true
    return false
  })
  const currentLocaleCode = currentLocale.split('-')[0]
  const filteredArray = filtered.map(f => Object.keys(f)[0]).filter(f => f !== currentLocaleCode)

  listItems.forEach(listItem => {
    const key = listItem.getAttribute('data-value')
    const show = filteredArray.includes(key) ? 'true' : 'false'
    listItem.setAttribute('data-show', show)
  })

  const showNoDataItem = filteredArray.length ? 'false' : 'true'
  noDataItem.setAttribute('data-show', showNoDataItem)
}

input.addEventListener('input', e => {
  const val = e.target.value.toLowerCase()
  updateOptions(val)
})
