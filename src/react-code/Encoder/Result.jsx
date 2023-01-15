import { useState } from 'react'

import { ethers } from 'ethers'
import styled from 'styled-components'

import { Button } from '../components/Button'
import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { typography } from '../styles/typography'
import { ConnectWallet } from './ConnectWallet'
import { Func } from './Func'
import { useContractCall } from './hooks/useContractCall'

const filter = {
  encode_data: {
    stateMutability: '[a-z]'
  },
  read_contract: {
    stateMutability: '(view|pure)'
  },
  write_contract: {
    stateMutability: '^(?!(view|pure))'
  }
}

const Result = (props) => {
  const [type, setType] = useState('encode_data')

  const { abi, address, title } = props

  const { callMethod, isReady } = useContractCall({
    abi,
    address
  })

  const handleType = (e) => {
    e.preventDefault()
    const _type = e.target.parentNode.value || e.target.value
    setType(_type)
  }

  const validateStateMutability = (stateMutability) => {
    const re = new RegExp(filter[type].stateMutability)
    return re.test(stateMutability)
  }

  const ethersInterface = new ethers.utils.Interface(abi)

  return (
    <Container>
      <Header>
        {title && <Title>{title}</Title>}
        {address && <Address>{address}</Address>}
      </Header>

      {Array.isArray(abi) && abi.length > 0 && (
        <CallToAction>
          <LeftGroup>
            <Btn
              hierarchy='secondary'
              data-active={type === 'encode_data'}
              size='sm'
              value='encode_data'
              onClick={handleType}
            >
              Encode Data
            </Btn>
            <Btn
              hierarchy='secondary'
              data-active={type === 'read_contract'}
              size='sm'
              value='read_contract'
              onClick={handleType}
            >
              Read Contract
            </Btn>
            <Btn
              hierarchy='secondary'
              data-active={type === 'write_contract'}
              size='sm'
              value='write_contract'
              onClick={handleType}
            >
              Write Contract
            </Btn>
          </LeftGroup>
          <RightGroup>
            {
              type !== 'encode_data' && (
                <ConnectWallet />
              )
            }
          </RightGroup>
        </CallToAction>
      )}

      <ListContainer>
        {
          Array.isArray(abi) &&
          abi.filter(func => (
            func.type === 'function' && validateStateMutability(func.stateMutability)
          )).map((func, i) => (
            <Func
              type={type}
              key={`func-${i}`}
              func={func}
              count={i + 1}
              call={callMethod}
              isReady={isReady}
              interface={ethersInterface}
            />
          ))
        }
      </ListContainer>
    </Container>
  )
}

const Container = styled.div`
  margin-top: 40px;

  @media (min-width: 1024px) { 
    margin-top: 98px;
  }
`

const Header = styled.div``

const Title = styled.h2`
  color: ${colors.gray[900]};
  ${typography.styles.displayXs}
  ${typography.weights.semibold}
  margin-bottom: 12px;

  .dark & {
    color: ${colors.white};
  }
`

const Address = styled.p`
  color: ${colors.gray[800]};
  ${typography.styles.textMd}
  ${typography.weights.regular}
  overflow: hidden;
  text-overflow: ellipsis;

  .dark & {
    color: ${colors.gray[25]}
  }
`

const ListContainer = styled.div`
  margin-top: 24px;
  overflow: hidden;

  .item {
    border-top: none;

    &:nth-of-type(1) {
      border-top: 1px solid ${colors.gray[300]};
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    &:nth-last-of-type(1) {
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      overflow: hidden;
    }
  }

  .dark & {
    .item {
      &:nth-of-type(1) {
        border-top: 1px solid ${colors.gray[700]};
      }
    }
  }
`

const CallToAction = styled.div`
  display: flex;
  margin: 24px 0;
  justify-content: space-between;
  flex-wrap: wrap;
  row-gap: 16px;
  column-gap: 8px;
`
const LeftGroup = styled.div`
  display: flex;
  gap: 8px;
`
const RightGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-left: auto;
`

const Btn = styled(Button)`
  padding: 8px 12px;
  ${typography.weights.semibold}
  ${typography.styles.textSm}
  cursor: pointer;
  color: ${colors.gray[500]};
  border: 1px solid transparent;
  box-shadow: none;

  &[data-active="true"] {
    background-color: ${colors[primaryColorKey][25]};
    color: ${colors[primaryColorKey][700]};
  }

  .dark & {
    color: ${colors.gray[300]};

    &[data-active="true"] {
      background-color: ${colors.gray[600]};
      color: ${colors.white};
    }
  }
`

export { Result }
