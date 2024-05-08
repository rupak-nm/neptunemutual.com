import './index.scss'

import { Web3ReactProvider } from '@web3-react/core'
import { SignMessage } from './SignMessage'
import { getLibrary } from '../lib/connect-wallet/utils/web3'
import { VerifyMessage } from './VerifyMessage'

const SignAndVerify = () => {
  return (
    <div className='sign and verify component'>
      <Web3ReactProvider getLibrary={getLibrary}>
        <SignMessage />
      </Web3ReactProvider>

      <VerifyMessage />
    </div>
  )
}

export { SignAndVerify }
