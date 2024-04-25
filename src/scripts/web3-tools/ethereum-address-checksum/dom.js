import { utils } from 'ethers'
import { copyToClipboard } from '../../util/copy'

const toChecksumSection = document.querySelector('.ethereum.checksum.container .inner > .section#toChecksumAddress')
const checkChecksumSection = document.querySelector('.ethereum.checksum.container .inner > .section#checkAddressChecksum')

const handleCopy = (btn) => {
  btn.addEventListener('click', () => {
    copyToClipboard(
      btn.getAttribute('data-address'),
      () => {
        btn.querySelector('span.text').textContent = 'Copied!'
        setTimeout(() => {
          btn.querySelector('span.text').textContent = 'Copy'
        }, 1000)
      })
  })
}

const handleAction = (section, fn, writeOutput = output => output) => {
  const input = section.querySelector('.address input')
  const output = section.querySelector('.result textarea')
  const error = section.querySelector('& > p.error')
  const copyButton = section.querySelector('.result > button.gray')

  if (copyButton) {
    handleCopy(copyButton)
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

    try {
      const result = fn(input.value)
      output.value = writeOutput(result)

      if (copyButton) {
        copyButton.removeAttribute('disabled')
        copyButton.setAttribute('data-address', result)
      }
    } catch (e) {
      console.error(e)
      output.value = writeOutput('')
      error.textContent = e.message
    }
  })
}

handleAction(toChecksumSection, utils.getAddress)
handleAction(checkChecksumSection, utils.isAddress, res => res ? 'Valid checksum address' : 'Invalid checksum address')
