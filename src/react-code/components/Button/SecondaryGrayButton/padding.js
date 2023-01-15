import { css } from 'styled-components'

const getPaddingLgX = (size) => {
  if (size === '2xl') {
    return 28
  }

  if (size === 'xl') {
    return 20
  }

  if (size === 'lg') {
    return 18
  }

  if (size === 'md') {
    return 16
  }

  if (size === 'sm') {
    return 14
  }

  return 14
}

const getPaddingLgY = (size) => {
  if (size === '2xl') {
    return 16
  }

  if (size === 'xl') {
    return 12
  }

  if (size === 'lg') {
    return 10
  }

  if (size === 'md') {
    return 10
  }

  if (size === 'sm') {
    return 8
  }

  return 8
}

const getPaddingMdX = (size) => {
  if (size === '2xl' || size === 'xl') {
    return 20
  }

  if (size === 'lg') {
    return 18
  }

  if (size === 'md') {
    return 16
  }

  if (size === 'sm') {
    return 14
  }

  return 14
}

const getPaddingMdY = (size) => {
  if (size === '2xl' || size === 'xl') {
    return 12
  }

  if (size === 'lg') {
    return 10
  }

  if (size === 'md') {
    return 10
  }

  if (size === 'sm') {
    return 8
  }

  return 8
}

export const padding = css`
  padding: ${props => getPaddingLgY(props.size)}px ${props => props.icon === 'only' ? getPaddingLgY(props.size) : getPaddingLgX(props.size)}px;
  
  @media (max-width: 767px) {
    padding: ${props => getPaddingMdY(props.size)}px ${props => props.icon === 'only' || props.$iconOnlyMobile ? getPaddingMdY(props.size) : getPaddingMdX(props.size)}px;; 
  }
`
