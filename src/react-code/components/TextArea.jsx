import styled from 'styled-components'

import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { shadows } from '../styles/shadows'
import { lightTheme } from '../styles/theme'
import { typography } from '../styles/typography'

const TextArea = ({ children, placeholder, label, error, ...props }) => {
  return (
    <Container>
      <Label htmlFor={props.id}>
        {label}
      </Label>

      <StyledTextArea
        data-error={(error) ? 'true' : 'false'}
        rows='4'
        placeholder={placeholder}
        {...props}
      />

      {(error) && <ErrorText>{error}</ErrorText>}
      {children}
    </Container>
  )
}

export { TextArea }

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  width:100%;
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

const StyledTextArea = styled.textarea`
  display: flex;
  width: 100%;
  background-color: ${lightTheme.primaryBackgroundColor};
  border: 1px solid ${colors.gray['300']};
  box-shadow: ${shadows.xs};
  border-radius: 8px;  
  padding: 12px 14px;
  gap: 8px;
  ${typography.styles.textMd};
  ${typography.weights.regular};
  min-height: 100px;
  height: auto;
  resize: vertical;

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
    &:focus-visible {

      outline: none;
      box-shadow: ${shadows.xs}, 0px 0px 0px 4px ${colors[primaryColorKey]['100']};
    }
  }

  &[data-error="true"] {
    border: 1px solid ${colors.error[700]};
  }

  @media screen and (max-width: 767px) {
    height: 214px;
  }

  .dark & {
    background-color: ${colors.gray[600]};
    border: 1px solid ${colors.gray['500']};
    
    ::placeholder {
      color: ${colors.gray['300']};
    }

    :-ms-input-placeholder {
      color: ${colors.gray['300']};
    }

    ::-ms-input-placeholder {
      color: ${colors.gray['300']};
    }

    &:not(&:disabled) {
      &[data-state="focussed"],
      &:focus,
      &:active,
      &:focus-visible {
        box-shadow: ${shadows.xs}, 0px 0px 0px 4px ${colors[primaryColorKey]['800']};
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
