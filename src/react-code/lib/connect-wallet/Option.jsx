import styled, { css } from 'styled-components'

import { Icon } from '../../components/Icon'
import { colors } from '../../styles/colors'
import { typography } from '../../styles/typography'
import { Loader } from './Loader'

export const Option = (props) => {
  const { id, name, onClick, iconVariant, iconVariantDark, connectingId } = props
  const WalletIconLight = <Icon variant={iconVariant} size={20} />
  const WalletIconDark = <Icon variant={iconVariantDark} size={20} />

  if (name.toLowerCase() === 'metamask wallet') {
    if (!(window.web3 || window.ethereum)) {
      return (
        <StyledLink
          href='https://metamask.io/'
          target='_blank'
          rel='noreferrer noopener'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install Metamask</p>
        </StyledLink>
      )
    }
  }

  if (name.toLowerCase() === 'okx wallet') {
    if (!(window.okxwallet)) {
      return (
        <StyledLink
          href='https://chrome.google.com/webstore/detail/okex-wallet/mcohilncbfahbmgdjkbpemcciiolgcge'
          target='_blank'
          rel='noreferrer noopener nofollow'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install OKX Wallet</p>
        </StyledLink>
      )
    }
  }

  if (name.toLowerCase() === 'binance wallet') {
    if (!window.BinanceChain) {
      return (
        <StyledLink
          href='https://docs.binance.org/smart-chain/wallet/binance.html'
          target='_blank'
          rel='noreferrer noopener'
        >
          <i className='icon light'>
            {WalletIconLight}
          </i>
          <i className='icon dark'>
            {WalletIconDark}
          </i>
          <p>Install Binance Wallet</p>
        </StyledLink>
      )
    }
  }

  return (
    <StyledButton
      key={id}
      onClick={onClick}
      type='button'
      disabled={connectingId}
    >
      <i className='icon light'>
        {WalletIconLight}
      </i>
      <i className='icon dark'>
        {WalletIconDark}
      </i>
      <p>{name}</p>

      {connectingId === id && <Loader />}
    </StyledButton>
  )
}

const LinkStyle = css`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 10px 18px;
  background-color: transparent;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  cursor: pointer;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.75;
  }

  p {
    ${typography.styles.textMd};
    ${typography.weights.semibold};
    color: ${colors.gray[700]};
  }

  i.icon.dark {
    display: none;
  }

  i.icon.light {
    display: block;
  }

  .dark & {
    i.icon.light {
      display: none;
    }

    i.icon.dark {
      display: block;
    }

    background-color: ${colors.gray[600]};
    border: 1px solid ${colors.gray[500]};

    p {
      color: ${colors.gray[25]};
    }
  }
`

const StyledButton = styled.button`
  ${LinkStyle};

  svg:last-child {
    width: 24px;
    height: 24px;
    margin-left: 12px;
  }
`

const StyledLink = styled.a`
  ${LinkStyle}
`
