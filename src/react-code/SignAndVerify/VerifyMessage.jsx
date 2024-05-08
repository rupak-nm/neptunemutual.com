import { TextArea } from '../components/TextArea'
import { InputWithLabel } from '../components/InputWithLabel/InputWithLabel'
import { Button } from '../components/Button/Button'
import { Icon } from '../components/Icon'
import { useState, useEffect } from 'react'
import { utils } from 'ethers'

const VerifyMessage = () => {
  const [message, setMessage] = useState('')
  const [signature, setSignature] = useState('')
  const [address, setAddress] = useState('')

  const [verified, setVerified] = useState(null)

  useEffect(() => {
    setVerified(null)
  }, [message, signature, address])

  const verifyMessage = async () => {
    try {
      const recoveredAddress = utils.verifyMessage(message, signature)

      console.log('recoveredAddress', recoveredAddress, 'address', address)

      if (recoveredAddress.toLowerCase() === address.toLowerCase()) {
        // alert('Signature verified successfully')
        setVerified(true)
      } else {
        // alert('Failed to verify signature')
        setVerified(false)
      }
    } catch (e) {
      console.error(e)
      // alert('Failed to verify signature')
      setVerified(false)
    }
  }

  const Alert = ({ _account, _message, _type = 'success' }) => (
    <div className='verify message alert' data-type={_type}>
      <div className='icon'>
        <Icon variant={_type === 'success' ? 'check' : 'alert-circle'} size='xl' />
      </div>

        <div className='content'>
          <div className='title'>
            {_type === 'success' ? 'Verified' : 'Failed to verify'}
          </div>
          {
            _type === 'success' && (
              <div className='description'>
                The address <b>{_account}</b> did sign the message: <br />{_message}
              </div>
            )
          }
        </div>
    </div>
  )

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
        onClick={verifyMessage}
      >
        <Icon variant={'check'} />
        Verify Message
      </Button>

      {
        (verified !== null) && (
          <>
            <hr />
            <Alert _account={address} _message={message} _type={verified ? 'success' : 'error'} />
          </>
        )
      }
    </div>
  )
}

export { VerifyMessage }
