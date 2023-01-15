const validateForm = () => {
  const fields = document.querySelectorAll('.contact.form input, .contact.form textarea')

  let status = true

  fields.forEach((x) => {
    const { valid } = x.validity

    if (!valid) {
      status = false
    }
  })

  return status
}

export { validateForm }
