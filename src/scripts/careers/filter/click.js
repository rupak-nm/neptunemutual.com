import * as handlers from './handlers'

const icon = document.querySelector(".ui.dropdown.filter.container li[data-selected='true'] > i:last-child")
const careersFilterButton = document.querySelector('#CareersFilterButton')

const updateCardVisibility = (selected) => {
  const { department } = selected.dataset

  document.querySelectorAll('div[data-department]').forEach((x) => x.classList.add('initially', 'hidden'))

  if (department === 'Any Department') {
    document.querySelectorAll('div[data-department]').forEach((x) => x.classList.remove('initially', 'hidden'))
    return
  }

  document.querySelectorAll(`div[data-department="${department}"]`).forEach((x) => x.classList.remove('initially', 'hidden'))
}

function onclick (el) {
  el.appendChild(icon)
  const selectedOption = el.innerText

  const span = careersFilterButton.querySelector('span')
  span.innerHTML = selectedOption

  handlers.close()

  updateCardVisibility(el)
}

export { handlers, onclick }
