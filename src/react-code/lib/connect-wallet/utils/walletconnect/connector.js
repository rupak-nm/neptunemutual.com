import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { POLLING_INTERVAL } from '../../config/connectors'

export const getConnector = () => {
  return new WalletConnectConnector({
    bridge: 'https://bridge.walletconnect.org',
    qrcode: true,
    pollingInterval: POLLING_INTERVAL
  })
}
