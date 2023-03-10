import {
  forwardRef,
  useEffect
} from 'react'

import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { shadows } from '../styles/shadows'
import { darkTheme, lightTheme } from '../styles/theme'
import { typography } from '../styles/typography'
import { Icon } from './Icon'

const InputWithLabel = forwardRef(({ children, placeholder, label, error, errorIcon, inputChildren, ...props }, ref) => {
  useEffect(() => {
    return () => {
      if (typeof props.onChange === 'function') {
        props?.onChange({ target: { value: '' } })
      }
    }
  }, [])

  return (
    <Container>
      <Label htmlFor={props.id}>
        {label}
      </Label>

      <InputWrapper>
        <StyledInput
          data-error={(error) ? 'true' : 'false'}
          placeholder={placeholder}
          autoComplete='off'
          {...props}
          ref={ref}
        />
        {(error && errorIcon) && <Icon variant={errorIcon} size={16} />}

        {inputChildren ?? <></>}
      </InputWrapper>

      {(error) && <ErrorText>{error}</ErrorText>}

      {/* Hint as children */}
      {children}
    </Container>
  )
})

InputWithLabel.displayName = 'InputWithLabel'

export { InputWithLabel }

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width:100%;
`

const InputWrapper = styled.div`
  position: relative;

  svg {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.error[700]} !important;
  }

  .dark & {
    svg {
      color: ${colors.error[300]} !important;
    }
  }
`

const Label = styled.label`
  flex: 1;
  margin-bottom: 6px;

  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${colors.gray[700]};

  .dark & {
    color: ${colors.gray[300]};
  }
`

const StyledInput = styled.input`
  display: flex;
  width: 100%;
  background-color: ${props => lightTheme.primaryBackgroundColor};
  border: 1px solid ${colors.gray['300']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;  
  padding: 12px 14px;
  gap: 8px;
  ${typography.styles.textMd};
  ${typography.weights.regular};

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${colors.gray['500']};
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */
    color: ${colors.gray['500']};
  }

  ::-ms-input-placeholder { /* Microsoft Edge */
    color: ${colors.gray['500']};
  }

  &:not(&:disabled) {
    &[data-state="hover"], &:hover {
    }

    &[data-state="focussed"],
    &:focus,
    &:active,
    &:hover,
    &:focus-visible {

      outline: none;
      box-shadow: ${shadows.xs},
        0px 0px 0px 4px ${colors[primaryColorKey]['100']};
    }
  }

  &[data-error="true"] {
    border: 1px solid ${colors.error[700]};
  }

  .dark & {
    color: ${colors.gray[300]};
    background-color: ${darkTheme.primaryBackgroundColor};
    border: 1px solid ${colors.gray[800]};
    
    ::placeholder {
      color: ${colors.gray['500']};
    }

    :-ms-input-placeholder { 
      color: ${colors.gray['500']};
    }

    ::-ms-input-placeholder {
      color: ${colors.gray['500']};
    }

    &:not(&:disabled) {
      &[data-state="focussed"],
      &:focus,
      &:active,
      &:hover,
      &:focus-visible {
        box-shadow: ${shadows.xs},
          0px 0px 0px 4px ${colors[primaryColorKey]['800']};
      }
    }
  }
`

const ErrorText = styled.p`
  margin-top:6px;
  ${typography.styles.textSm}
  ${typography.weights.regular}

  color: ${colors.error[800]};

  &:empty {
    display: none;
  }

  .dark & {
    color: ${colors.error[600]};
  }
`
