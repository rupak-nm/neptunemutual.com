import styled from 'styled-components'

import { colors } from '../../../styles/colors'
import { shadows } from '../../../styles/shadows'
import {
  darkTheme,
  lightTheme
} from '../../../styles/theme'
import { utils } from '../../../styles/utils'
import { Icon } from '../../Icon'
import { gap } from './gap'
import { iconSize } from './iconSize'
import { padding } from './padding'
import { textStyle } from './textStyle'

const getBgColor = (destructive) => {
  return destructive ? colors.error : colors.gray
}

export const SecondaryGrayButton = ({
  size,
  icon = 'default',
  iconLeading,
  iconTrailing,
  iconVariant,
  iconOnlyMobile,
  destructive,
  state,
  disabled,
  children,
  ...rest
}) => {
  return (
    <StyledButton
      icon={icon}
      size={size}
      disabled={disabled || state === 'disabled'}
      data-state={state}
      destructive={destructive}
      $iconOnlyMobile={iconOnlyMobile}
      {...rest}
    >
      {iconLeading && <Icon variant={iconVariant} />}
      <Content $iconOnlyMobile={iconOnlyMobile} $icon={icon}>{children}</Content>
      {iconTrailing && <Icon variant={iconVariant} />}
    </StyledButton>
  )
}

const StyledButton = styled.button`
  --borderColor: ${(props) => getBgColor(props.destructive)['300']};
  --backgroundColor: ${(props) => lightTheme.primaryBackgroundColor};

  display: flex;
  justify-content: center;
  align-items: center;
  ${gap};
  ${iconSize};
  ${textStyle};
  ${padding};
  cursor: pointer;

  color: ${(props) => getBgColor(props.destructive)['700']};
  background-color: var(--backgroundColor);
  border: 1px solid var(--borderColor);
  border-radius: 8px;
  box-shadow: ${shadows.xs};

  &:disabled {
    color: ${(props) => getBgColor(props.destructive)['300']};
    --borderColor: ${(props) => getBgColor(props.destructive)['200']};
    cursor: not-allowed;
  }

  &:not(&:disabled) {
    &[data-state="hover"], :hover {
      color: ${(props) => getBgColor(props.destructive)['800']};
      --backgroundColor: ${(props) => getBgColor(props.destructive)['50']};
    }

    &[data-state="focussed"],
    &:focus,
    &:active,
    &:focus-visible {
      --borderColor: ${(props) => getBgColor(props.destructive)['200']};

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${(props) => getBgColor(props.destructive)['100']};
    }
  }

  .dark & {
    --borderColor: ${(props) => getBgColor(props.destructive)['600']};
    --backgroundColor: ${(props) => darkTheme.primaryBackgroundColor};

    color: ${(props) => getBgColor(props.destructive)['50']};

    &:not(&:disabled) {
      &[data-state="hover"], &:hover {
        color: ${(props) => getBgColor(props.destructive)['100']};
        --backgroundColor: ${(props) => getBgColor(props.destructive)['600']};
      }

      &[data-state="focussed"],
      &:focus,
      &:active,
      &:focus-visible {
        --borderColor: ${(props) => getBgColor(props.destructive)['600']};
        box-shadow: ${shadows.xs},
          0px 0px 0px 4px ${(props) => getBgColor(props.destructive)['700']};
      }
    }
  }
`

const Content = styled.span`
  ${props => (props.$icon === 'only') && utils.srOnly};

  @media (max-width: 767px) {
    ${props => (props.$iconOnlyMobile) && utils.srOnly};
  }
`
