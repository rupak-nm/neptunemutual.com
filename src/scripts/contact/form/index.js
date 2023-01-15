import { post } from './request'
import { serialize } from './serializer'
import { validateForm } from './validation'

const form = document.querySelector('.contact.form')
const button = document.querySelector('#SendMessageButton')

const submit = async (e) => {
  button.disabled = true
  form.classList.add('locked')

  try {
    e.preventDefault()

    const error = document.querySelector('.error.message')
    error.classList.add('initially', 'hidden')

    const valid = validateForm()

    if (!valid) {
      return
    }

    const data = serialize()
    await post(data)
  } catch (error) {
    console.error(error)
  } finally {
    button.disabled = false
    form.classList.remove('locked')
  }
}

form.addEventListener('submit', submit, { passive: true })
