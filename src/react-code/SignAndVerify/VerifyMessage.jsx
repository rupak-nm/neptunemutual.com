import { TextArea } from '../components/TextArea'
import { InputWithLabel } from '../components/InputWithLabel/InputWithLabel'
import { Button } from '../components/Button/Button'
import { Icon } from '../components/Icon'
import { useState, useEffect } from 'react'
import * as wallet from '@ethersproject/wallet'

const Alert = ({ account, message, signature, type = 'success' }) => {
  const recoveredAddress = wallet.verifyMessage(message, signature)

  const title = type === 'success'
    ? 'Verified'
    : 'Failed to verify'

  return (
    <div className='verify message alert' data-type={type}>
      <div className='icon'>
        <Icon variant={type === 'success' ? 'check' : 'alert-circle'} size='xl' />
      </div>

      <div className='content'>
        <div className='title'>
          {title}
        </div>

        {
          type === 'success'
            ? (
            <div className='description'>
              The address <b>{account}</b> did sign the message: <br /><i><b>{message}</b></i>
            </div>
              )
            : (
            <div className='description'>
              This message was signed by <b>{recoveredAddress}</b>, which does not match the provided wallet <b>{account}</b>. Are you sure you have connected the correct wallet while signing?
            </div>
              )
        }
      </div>
    </div>
  )
}

const VerifyMessage = () => {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [address, setAddress] = useState('')

  const [verified, setVerified] = useState(null)

  useEffect(() => {
    setVerified(null)
  }, [message, signature, address])

  const handleSubmit = async () => {
    try {
      const recoveredAddress = wallet.verifyMessage(message, signature)

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        setVerified(true)
      } else {
        setVerified(false)
      }
    } catch (e) {
      console.error(e)
      setVerified(false)
    }
  }

  return (
    <div className="verify section">
      <h2>Verify Message</h2>

      <InputWithLabel
        label="Message"
        placeholder="Enter message to verify"
        type="text"
        id="verify-message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <TextArea
        label="Signature"
        placeholder="Enter signature"
        type="textarea"
        id="signature-input"
        value={signature}
        onChange={e => setSignature(e.target.value)}
      />

      <InputWithLabel
        label="Address"
        placeholder="Enter address"
        type="text"
        id="address-input"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />

      <Button variant="primary"
        disabled={!message || !signature || !address}
        id="verify-button"
        onClick={handleSubmit}
      >
        <Icon variant={'check'} />
        Verify Message
      </Button>

      {
        (verified !== null) && (
          <>
            <hr />
            <Alert
              account={address}
              message={message}
              signature={signature}
              type={verified ? 'success' : 'error'} />
          </>
        )
      }
    </div>
  )
}

export { VerifyMessage }
