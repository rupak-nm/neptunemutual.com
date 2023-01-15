const onError = (el) => {
  const container = el.closest('.email.subscription.container')
  const message = container.querySelector('.error.message')

  container.classList.remove('locked')
  message.classList.remove('initially', 'hidden')

  setTimeout(() => {
    message.classList.add('initially', 'hidden')
  }, 5000)
}

export { onError }
