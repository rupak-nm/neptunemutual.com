import { TextArea } from '../components/TextArea'
import { InputWithLabel } from '../components/InputWithLabel/InputWithLabel'
import { Button } from '../components/Button/Button'
import { useWeb3React } from '@web3-react/core'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { copyToClipboard } from '../../scripts/util/copy'
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet'

const SignMessage = () => {
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('')
  const { account, library } = useWeb3React()
  const [signing, setSigning] = useState(false)

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copyToClipboard(signedMessage, () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const signMessage = async () => {
    if (!library || !library.getSigner) {
      console.error('No signer available')
      return
    }

    const signer = library.getSigner()

    setSigning(true)

    try {
      const signature = await signer.signMessage(message)
      setSignedMessage(signature)
    } catch (e) {
      console.error(e)
    }

    setSigning(false)
  }

  return (
    <div className="sign section">
      <div className='title and cta'>
        <h2>Sign Message</h2>
        <ConnectWallet />
      </div>

      <InputWithLabel
        label="Message"
        placeholder="Enter message to sign"
        type="text"
        id="message-input"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <Button
        variant="primary"
        id="sign-button"
        disabled={!account || !message || signing}
        onClick={signMessage}
      >
        <Icon variant={'lock-04'} />
        Sign Message
      </Button>

      <hr />

      <TextArea
        label="Signed Message"
        placeholder=""
        type="textarea"
        id="signature-result"
        value={signedMessage}
        onChange={e => setSignedMessage(e.target.value)}
        disabled
      >
        <div className="copy button container">
          <Button
            disabled={!signedMessage || copied}
            onClick={handleCopy}
          >
            {
              copied
                ? (
                <>
                  <Icon variant={'check'} />
                  Copied
                </>
                  )
                : (
                <>
                  <Icon variant={'copy-01'} />
                  Copy
                </>
                  )
            }
          </Button>
        </div>
      </TextArea>
    </div>
  )
}

export { SignMessage }
