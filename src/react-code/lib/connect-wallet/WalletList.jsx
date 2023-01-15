import { useState } from 'react'
import styled from 'styled-components'
import { Option } from './Option'

export const WalletList = ({ wallets, onConnect, isConnecting }) => {
  const [connectingId, setConnectingId] = useState('')

  return (
    <Container>
      {wallets.map((wallet) => (
        <Option
          key={wallet.id}
          onClick={() => {
            setConnectingId(wallet.id)
            onConnect(wallet.id)
          }}
          connectingId={(isConnecting && connectingId) ? connectingId : ''}
          {...wallet}
        />
      ))}
    </Container>
  )
}

const Container = styled.div`
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`
