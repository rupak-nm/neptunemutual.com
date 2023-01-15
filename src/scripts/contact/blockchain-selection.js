{
  const buttons = document.querySelectorAll('.ui.blockchain.selection.list button')
  const target = document.querySelector('#BlockchainsInputText')

  const displaySelection = () => {
    const selected = document.querySelectorAll('.ui.blockchain.selection.list button.selected')

    const chains = []

    selected.forEach((x) => {
      chains.push(x.innerText)
    })

    target.value = chains.join(', ')
  }

  function click () {
    const button = this
    const selected = !button.classList.contains('selected')

    selected
      ? button.classList.add('selected')
      : button.classList.remove('selected')

    displaySelection()
  }

  buttons.forEach((x) => x.addEventListener('click', click, { passive: true }))
}
