const onSuccess = (el) => {
  const container = el.closest('.email.subscription.container')
  const message = container.querySelector('.success.message')
  const input = container.querySelector('input[type=email]')

  input.value = ''

  container.classList.remove('locked')
  message.classList.remove('initially', 'hidden')

  setTimeout(() => {
    message.classList.add('initially', 'hidden')
  }, 5000)
}

export { onSuccess }
