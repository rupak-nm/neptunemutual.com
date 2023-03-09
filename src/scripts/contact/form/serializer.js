const serialize = () => {
  const data = {}
  const members = document.querySelectorAll('[data-member]')

  members.forEach((x) => {
    const { dataset, value } = x
    const { member } = dataset
    data[member] = value
  })

  data.mock = window.mock
  data.blockchains = data.blockchains ? data.blockchains.split(',').map(x => x.trim()) : []
  data.captcha = window.grecaptcha.getResponse()

  return data
}

export { serialize }
