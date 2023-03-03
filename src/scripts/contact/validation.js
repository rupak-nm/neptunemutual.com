{
  const fields = document.querySelectorAll('.contact.form input, .contact.form textarea')

  function blur () {
    const { valid } = this.validity
    const target = this.closest('.input.container')

    if (!target) {
      return
    }

    target.classList.remove('error')

    if (!valid) {
      target.classList.add('error')
      return
    }

    appendHttps(this)
  }

  // append "https://" to url if not provided
  function appendHttps (element) {
    const isUrlInput = element.id === 'WebsiteInputUrl'
    const hasHttp = element.value.match(/^https?:\/\//)

    if (isUrlInput && !hasHttp) {
      element.value = `https://${element.value}`
    }
  }

  fields.forEach((x) => x.addEventListener('blur', blur, { passive: true }))
}
