import './ConnectWallet.scss'

import { Button } from '../Button/Button'
import { ConnectedDropdown } from './ConnectedDropdown'
import { useConnectWallet } from '../../packages/web3-core'

const ConnectWallet = () => {
  const { account, openPopup } = useConnectWallet()

  const handleWalletButtonClick = () => {
    openPopup()
  }

  return account
    ? <ConnectedDropdown />
    : <Button data-text-size="xs" onClick={handleWalletButtonClick} iconVariant='wallet-04' iconLeading size='md'>Connect Wallet</Button>
}

export { ConnectWallet }
