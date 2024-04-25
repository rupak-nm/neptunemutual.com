import { utils } from 'ethers'

const toChecksumSection = document.querySelector('.ethereum.checksum.container .inner > .section#toChecksumAddress')
const checkChecksumSection = document.querySelector('.ethereum.checksum.container .inner > .section#checkAddressChecksum')

const handleCopy = (copyBtn, copiedBtn) => {
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(copyBtn.getAttribute('data-address'))
      copyBtn.style.display = 'none'
      copiedBtn.style.display = 'block'

      setTimeout(() => {
        copiedBtn.style.display = 'none'
        copyBtn.style.display = 'block'
      }, 1000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  })
}

const handleAction = (section, handler = () => {}) => {
  const input = section.querySelector('.address input')
  const output = section.querySelector('.result textarea')
  const error = section.querySelector('& > p.error')

  const copyButton = section.querySelector('.result .copy.button button')
  const copiedButtonContainer = section.querySelector('.result .copied.button')

  if (copyButton) {
    handleCopy(copyButton, copiedButtonContainer)
  }

  input.addEventListener('input', () => {
    output.value = ''
    error.textContent = ''

    if (copyButton) {
      copyButton.setAttribute('disabled', true)
    }

    if (!input.value.trim()) {
      return
    }

    handler(input, output, copyButton, error)
  })
}

const handleToChecksum = (input, output, copyButton, error) => {
  try {
    const result = utils.getAddress(input.value.toLowerCase())
    output.value = result

    if (copyButton) {
      copyButton.removeAttribute('disabled')
      copyButton.setAttribute('data-address', result)
    }
  } catch (e) {
    console.error(e)
    output.value = ''
    error.textContent = e.message
  }
}

const handleCheckChecksum = (input, output, copyButton) => {
  try {
    const result = utils.getAddress(input.value)
    output.value = result === input.value ? 'Valid Checksum Address' : 'False'

    if (copyButton) {
      copyButton.removeAttribute('disabled')
      copyButton.setAttribute('data-address', result)
    }
  } catch (e) {
    console.error(e)
    output.value = 'False'
  }
}

handleAction(toChecksumSection, handleToChecksum)
handleAction(checkChecksumSection, handleCheckChecksum)
