import { css } from 'styled-components'

import { typography } from '../../../styles/typography'

const getTextStyleLg = (size) => {
  if (size === '2xl') {
    return typography.styles.textLg
  }

  if (size === 'xl') {
    return typography.styles.textMd
  }

  if (size === 'lg') {
    return typography.styles.textMd
  }

  if (size === 'md') {
    return typography.styles.textSm
  }

  if (size === 'sm') {
    return typography.styles.textSm
  }

  return typography.styles.textSm
}

const getTextStyleMd = (size) => {
  if (size === '2xl' || size === 'xl') {
    return typography.styles.textMd
  }

  if (size === 'lg') {
    return typography.styles.textMd
  }

  if (size === 'md') {
    return typography.styles.textSm
  }

  if (size === 'sm') {
    return typography.styles.textSm
  }

  return typography.styles.textSm
}

export const textStyle = css`
  ${props => getTextStyleLg(props.size)};
  ${typography.weights.semibold};
 
  @media (max-width: 767px) {
    ${props => getTextStyleMd(props.size)};
  }
`
