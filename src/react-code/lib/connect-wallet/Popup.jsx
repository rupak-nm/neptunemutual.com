import {
  useEffect,
  useState
} from 'react'

import styled from 'styled-components'

import { Dialog } from '@headlessui/react'
import { useWeb3React } from '@web3-react/core'

import { Icon } from '../../components/Icon'
import { Modal } from '../../components/Modal'
import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { typography } from '../../styles/typography'
import { utils } from '../../styles/utils'
import { wallets } from './config/wallets'
import { Disclaimer } from './Disclaimer'
import useAuth from './hooks/useAuth'
import { WalletList } from './WalletList'

export const Popup = ({ isOpen, onClose, notifier = console.log }) => {
  const [isConnecting, setIsConnecting] = useState(false)
  const { active } = useWeb3React()

  const { login } = useAuth((_error) => {
    setIsConnecting(false)
    notifier(_error)
  })

  useEffect(() => {
    if (!isOpen) setIsConnecting(false)

    if (active) {
      setIsConnecting(false)
      onClose()
    }
  }, [isOpen, active, onClose])

  const onConnect = (id) => {
    setIsConnecting(true)
    const wallet = wallets.find((x) => x.id === id)
    const connectorName = wallet.connectorName
    login(connectorName)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Wrapper>
        <WalletIcon>
          <Icon variant='wallet-04' size={24} />
        </WalletIcon>

        <StyledDialogTitle as='h3'>
          Connect Wallet
        </StyledDialogTitle>

        <CloseButton
          onClick={onClose}
        >
          <span>Close</span>
          <Icon variant='x-close' size={24} />
        </CloseButton>

        <Disclaimer />
        <WalletList
          wallets={wallets}
          onConnect={onConnect}
          isConnecting={isConnecting}
        />

      </Wrapper>
    </Modal>
  )
}

const Wrapper = styled.div`
  display: inline-block; 
  position: relative; 
  margin-top: 2rem;
  margin-bottom: 2rem; 
  transition-property: all; 
  text-align: left; 
  vertical-align: middle; 
  max-width: 400px; 
  border-radius: 12px; 
  padding: 24px; 
  background: ${colors.white};
  
  @media screen and (max-width: 767px) {
    padding: 2rem; 
  }

  .dark & {
    background: ${colors.gray[800]};
  }
`

const WalletIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${colors[primaryColorKey][600]};
  background-color: ${colors[primaryColorKey][100]};
  width: max-content; 
  border-radius: 50%;
  box-shadow: 0 0 0 8px ${colors[primaryColorKey][50]};

  .dark & {
    color: ${colors.white};
    background-color: ${colors.gray[600]};
    box-shadow: 0 0 0 8px ${colors.gray[700]};
  }
`

const StyledDialogTitle = styled(Dialog.Title)`
  margin-top: 16px;
  color: ${colors.black};
  ${typography.styles.textLg}
  ${typography.weights.semibold}
  
  .dark & {
    color: ${colors.white};
  }
`

const CloseButton = styled.button`
  display: flex; 
  position: absolute; 
  padding: 6px;
  top: 16px; 
  right: 16px; 
  color: ${colors.gray[500]}; 
  justify-content: center; 
  align-items: center; 
  border-radius: 0.375rem; 
  cursor: pointer;

  span {
    ${utils.srOnly}
  }

  .dark & {
    color: ${colors.white}; 
  }
`
