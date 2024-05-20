import './index.scss'

import { SignMessage } from './SignMessage'
import { VerifyMessage } from './VerifyMessage'
import { ConnectorNames, ConnectWallet } from '../packages/web3-core'
import { Popup } from '../components/ConnectWallet/Popup'

const SUPPORTED_NETWORKS = []

const SUPPORTED_CONNECTORS = [
  ConnectorNames.Injected,
  ConnectorNames.MetaMask,
  ConnectorNames.CoinbaseWallet,
  ConnectorNames.BitKeepWallet,
  ConnectorNames.BinanceWallet,
  ConnectorNames.OKXWallet,
  ConnectorNames.Gnosis
]

const SignAndVerify = () => {
  return (
    <div className='sign and verify component'>
      <ConnectWallet.Root
        getInitialNetwork={async () => null}
        connectors={SUPPORTED_CONNECTORS}
        supportedNetworks={SUPPORTED_NETWORKS}
      >
        <SignMessage />
        <Popup />
      </ConnectWallet.Root>
      <VerifyMessage />
    </div>
  )
}

export { SignAndVerify }
