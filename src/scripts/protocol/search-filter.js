{
  const items = document.querySelectorAll('.contracts.list.view .item')
  const input = document.querySelector('.search.input')

  const showAll = () => items.forEach(x => x.classList.remove('hidden'))
  const hideAll = () => items.forEach(x => x.classList.add('hidden'))

  const onInput = (e) => {
    const search = (e.srcElement.value ?? '').trim().toLowerCase()

    if (!search) {
      showAll()
      return
    }

    hideAll()

    items.forEach(x => {
      const text = x.textContent.toLowerCase()

      if (text.includes(search)) {
        x.classList.remove('hidden')
      }
    })
  }

  input.addEventListener('input', onInput, { passive: true })
}
