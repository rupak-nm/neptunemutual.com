{
  const items = document.querySelectorAll('.contracts.list.view .item')
  const input = document.querySelector('.search.input')

  const showAll = () => items.forEach(x => x.classList.remove('hidden'))
  const hideAll = () => items.forEach(x => x.classList.add('hidden'))

  const onInput = ({ srcElement }) => {
    const { value } = srcElement
    const search = (value || '').trim().toLowerCase()

    if (!search) {
      showAll()
      return
    }

    hideAll()

    items.forEach(x => {
      const { textContent } = x

      if (textContent.toLowerCase().indexOf(search) > -1) {
        x.classList.remove('hidden')
      }
    })
  }

  input.addEventListener('input', onInput, { passive: true })
}
