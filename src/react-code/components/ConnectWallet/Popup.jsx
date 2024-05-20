import {
  useEffect,
  useState
} from 'react'

import { Button } from '../Button/Button'
import { Icon } from '../Icon'
import { Modal } from '../Modal/Modal'
import { useConnectWallet, useConnectWalletPopup } from '../../packages/web3-core'

const Loader = ({ ...rest }) => {
  return (
    <svg
      className='loader'
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...rest}
    >
      <circle
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </svg>
  )
}

const Option = ({ name, Icon, onClick, isInstalled, getInstallationURL }) => {
  if (isInstalled()) {
    return (
      <Button variant='secondary-gray' size='lg' onClick={onClick}>
        <Icon className='mr-6' width={24} />
        {name}
      </Button>
    )
  }

  if (getInstallationURL()) {
    return (
      <a
        href={getInstallationURL()}
        target='_blank'
        rel='noreferrer noopener nofollow'
        className='ui secondary gray button'
        data-text-size="lg"
        variant="secondary-gray"
      >
        <Icon className='mr-6' width={24} />
        <p>Install {name}</p>
      </a>
    )
  }

  return null
}

const WalletList = ({ wallets, onConnect }) => {
  return (
    wallets.map((wallet) => {
      return <Option
        key={wallet.id}
        onClick={() => {
          onConnect(wallet.id)
        }}
        Icon={wallet.Icon}
        name={wallet.name}
        isInstalled={wallet.isInstalled}
        getInstallationURL={wallet.getInstallationURL}
      />
    })
  )
}

const ErrorComponent = ({ title, description }) => (
  <div className='error'>
    <div className='icon'>
      <Icon variant='alert-circle' size='lg' />
    </div>

      <div className='content'>
        <div className='title'>{title}</div>
        <div className='description'>{description}</div>
      </div>
  </div>
)

export const Popup = () => {
  const { login } = useConnectWallet()
  const { wallets, isOpen, setIsOpen, isConnecting } = useConnectWalletPopup()
  const [error, setError] = useState(null)

  useEffect(() => {
    if (error) {
      setIsOpen(true)
    }
  }, [error])

  const onConnect = async (id) => {
    try {
      const wallet = wallets.find(x => x.id === id)

      if (!wallet) {
        throw Error('Invalid wallet id: ' + id)
      }

      await login(wallet.connectorName)
    } catch (error) {
      console.error(error)
      setError(error && error.message)
    }
  }

  const onClose = () => {
    setError(null)
    setIsOpen(false)
  }

  return (
    <Modal
      title={
        <>
          <div className='wallet icon'>
            <Icon variant='wallet-04' size='xl' />
          </div>
          Connect Wallet
        </>
      }
      visible={isOpen} setVisible={onClose}
      description={
        <>By connecting a wallet, you agree to Neptune Mutual <a target='_blank' href={'/policies/standard-terms-and-conditions/'}>Terms & Conditions</a> and acknowledge that you have read and understand the Neptune Mutual <a target='_blank' href={'/docs/usage/disclaimer/'}>Protocol Disclaimer</a>.</>
      }
      className='connect wallet modal'
      cross
    >
      {isConnecting ? <Loader /> : <WalletList wallets={wallets} onConnect={onConnect} />}

      {error && (
        <ErrorComponent
          title={'Error'}
          description={error}
        />
      )}
    </Modal>
  )
}
