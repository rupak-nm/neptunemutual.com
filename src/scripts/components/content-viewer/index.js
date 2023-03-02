import mediumZoom from '../../utils/image-zoom.min'

{
  function click () {
    document.querySelectorAll('.table.of.contents.container a.active.item').forEach(x => x.classList.remove('active'))
    this.classList.add('active')
  }

  const anchors = document.querySelectorAll('.table.of.contents.container a.item')
  anchors.forEach(x => x.addEventListener('click', click, { passive: true }))
}
{
  const socialShareContainer = document.querySelector('.social.share.container')

  if (socialShareContainer) {
    const copyToClipBoard = (text) => {
      if (!navigator.clipboard) {
        const textArea = document.createElement('textarea')
        textArea.value = text

        // Avoid scrolling to bottom
        textArea.style.top = '0'
        textArea.style.left = '0'
        textArea.style.position = 'fixed'

        document.body.appendChild(textArea)
        textArea.focus()
        textArea.select()

        try {
          document.execCommand('copy')
        } finally {
          document.body.removeChild(textArea)
        }
      }

      navigator?.clipboard?.writeText(text)
    }

    socialShareContainer.querySelector('.copy.link').addEventListener('click', function (e) {
      e.preventDefault()
      const button = this

      const target = button.querySelector('span[data-toggled-text]')
      const { toggledText } = target.dataset

      const { href } = new URL(window.location.pathname, window.location.origin)
      copyToClipBoard(href)

      const backup = target.textContent
      target.textContent = toggledText
      this.disabled = true

      setTimeout(() => {
        target.textContent = backup
        this.disabled = false
      }, 1000)
    })
  }
}

{
  const images = [
    ...document.querySelectorAll('.content.viewer img')
  ]

  mediumZoom(images)
}
