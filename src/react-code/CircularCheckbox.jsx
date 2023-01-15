import React from 'react'
import styled from 'styled-components'
import { colors, primaryColorKey } from './styles/colors'
import { shadows } from './styles/shadows'
import { typography } from './styles/typography'

export const CircularCheckbox = React.forwardRef(
  ({ id = 'checkbox', name, children, ...inputProps }, ref) => {
    return (
      <Container>
        <Check
          ref={ref}
          id={id}
          name={name}
          type='checkbox'
          {...inputProps}
        />

        <Label htmlFor={id} className='ml-3 align-middle'>
          {children}
        </Label>
      </Container>
    )
  }
)

CircularCheckbox.displayName = 'Checkbox'

const Container = styled.div`
  display: flex;
`

const Label = styled.label`
  margin-left: 12px;
  ${typography.styles.textMd}
  ${typography.weights.regular}
  color: ${colors.gray[600]};
  .dark & {
    color: ${colors.gray[300]};
  }
`

const Check = styled.input`
  appearance: none;
  padding: 0;
  print-color-adjust: exact;
  display: inline-block;
  vertical-align: middle;
  background-origin: border-box;
  user-select: none;
  flex-shrink: 0;
  background-repeat: no-repeat;
  background-position: center;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid ${colors[primaryColorKey][600]};
  background-color: transparent;
  .dark & {
    border: 1px solid ${colors.gray[300]};
    background-color: ${colors.white};

    &:focus,
  &:active,
  &:focus-visible {
      box-shadow: ${shadows.xs},
    0px 0px 0px 4px ${colors[primaryColorKey]['800']};
    }
  }
  
  &:focus,
  &:active,
  &:focus-visible {
    outline: none;
    box-shadow: ${shadows.xs},
      0px 0px 0px 4px ${colors[primaryColorKey]['100']};
    
  }

  &:hover,
  & + label:hover {
    border-color: rgb(130, 130, 130);
    cursor: pointer;
  }

  background-position: center;
  background-repeat: no-repeat;
  &:checked {
    background-image: url("data:image/svg+xml,%3Csvg width='10' height='10' viewBox='0 0 10 10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M8.33332 2.5L3.74999 7.08333L1.66666 5' stroke='white' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A");
    background-color: ${colors[primaryColorKey][600]};
    border: 1px solid inherit;
    .dark & {
      border: 1px solid transparent;
      background-color: ${colors[primaryColorKey][600]};
    }
  }
`
