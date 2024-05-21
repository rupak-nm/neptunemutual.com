import { TextArea } from '../components/TextArea'
import { InputWithLabel } from '../components/InputWithLabel/InputWithLabel'
import { Button } from '../components/Button/Button'
import { useState } from 'react'
import { Icon } from '../components/Icon'
import { copyToClipboard } from '../../scripts/util/copy'
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet'
import { useConnectWallet } from '../packages/web3-core'

const FailedAlert = ({ message }) => {
  return (
    <div className='sign message alert' data-type={'error'}>
      <div className='icon'>
        <Icon variant={'alert-circle'} size='xl' />
      </div>

      <div className='content'>
        {message}
      </div>
    </div>
  )
}

const SignMessage = () => {
  const [message, setMessage] = useState('')
  const [signedMessage, setSignedMessage] = useState('-')
  const { account, signerOrProvider } = useConnectWallet()
  const [signing, setSigning] = useState(false)
  const [error, setError] = useState(null)
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    copyToClipboard(signedMessage, () => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const signMessage = async () => {
    if (!signerOrProvider) {
      console.error('No signer available')
      return
    }

    setSigning(true)

    try {
      const signature = await signerOrProvider.signMessage(message)
      setSignedMessage(signature)
    } catch (e) {
      console.error(e)
      setError('Signing message failed. Please try again')
    }

    setSigning(false)
  }

  return (
    <div className="sign section">
      <div className='title and cta'>
        <h2>Sign Message</h2>
        <ConnectWallet />
      </div>

      {
        error && (
          <FailedAlert message={error} />
        )
      }

      <InputWithLabel
        label="Address"
        placeholder="-"
        type="text"
        id="address-input"
        disabled
      >
        This address is connected to your Web3 wallet.
        </InputWithLabel>

      <InputWithLabel
        label="Message"
        placeholder="Enter message to sign"
        type="text"
        id="message-input"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value)
          setError(null)
        }}
      />

      <Button
        variant="primary"
        id="sign-button"
        disabled={!account || !message || signing}
        onClick={signMessage}
      >
        Sign Message
      </Button>

      <TextArea
        label="Signed Message"
        placeholder=""
        type="textarea"
        id="signature-result"
        value={signedMessage}
        disabled
      >
        <div className="copy button container">
          <Button
            disabled={signedMessage === '-' || copied}
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
