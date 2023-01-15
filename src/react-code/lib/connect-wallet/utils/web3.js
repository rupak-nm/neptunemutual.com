import { POLLING_INTERVAL } from '../config/connectors'
import { Web3Provider } from '@ethersproject/providers'

// Used if wallet is connected
export const getLibrary = (provider) => {
  const library = new Web3Provider(provider)

  library.pollingInterval = POLLING_INTERVAL
  return library
}
