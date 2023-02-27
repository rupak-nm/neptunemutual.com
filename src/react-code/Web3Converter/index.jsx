import {
  useEffect,
  useState
} from 'react'

import styled, { css } from 'styled-components'

import { Breadcrumbs } from '../Breadcrumbs'
import { CircularCheckbox } from '../CircularCheckbox'
import { handleCopy } from '../helpers'
import {
  bytes32ToNumber,
  bytes32ToString,
  numberToBytes32,
  stringToBytes32
} from '../helpers/web3-tools'
import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { shadows } from '../styles/shadows'
import { typography } from '../styles/typography'
import { utils } from '../styles/utils'
import { Tooltip } from '../Tooltip'

const defaultValue = {
  from: 'string',
  to: 'bytes32',
  inputPlaceholder: 'Example: foobar',
  resultPlaceholder: '0x'
}

const getInfoBySlug = slug => {
  let _info = {}

  switch (slug) {
    case 'string-to-bytes32':
      _info = {
        from: 'string',
        to: 'bytes32',
        inputPlaceholder: 'Example: foobar',
        resultPlaceholder: '0x'
      }
      break

    case 'number-to-bytes32':
      _info = {
        from: 'number',
        to: 'bytes32',
        inputPlaceholder: 'Example: 123.456',
        resultPlaceholder: '0x'
      }
      break

    case 'bytes32-to-string':
      _info = {
        from: 'bytes32',
        to: 'string',
        inputPlaceholder: 'Example: 0x7465737400000000000000000000000000000000000000000000000',
        resultPlaceholder: 'foobar'
      }
      break

    case 'bytes32-to-number':
      _info = {
        from: 'bytes32',
        to: 'number',
        inputPlaceholder: 'Example: 0x7465737400000000000000000000000000000000000000000000000',
        resultPlaceholder: '123.456'
      }
      break

    default:
      _info = defaultValue
      break
  }

  return _info
}

const getCapitalizedText = (t = '') => `${t[0].toUpperCase()}${t.slice(1)}`

const getTitleText = t => {
  const _t = getCapitalizedText(t)
  if (t === 'bytes32') return `Solidity ${_t}`
  return _t
}

const initialFormValues = {
  input: '',
  result: '',
  radio: 'string',
  padding: true
}

const initialErrorValues = {
  input: false,
  result: false
}

export const Web3Converter = ({ slug, crumbs }) => {
  const [info, setInfo] = useState(defaultValue)
  const [formData, setFormData] = useState(initialFormValues)
  const [error, setError] = useState(initialErrorValues)
  const [copied, setCopied] = useState(false)

  const getSwitchButtonSlug = () => {
    return `/web3-tools/${info.to}-to-${info.from}-converter`
  }

  const getRadioSwitchSlug = () => {
    const alternate = (t) => t === 'string' ? 'number' : t === 'number' ? 'string' : t
    return `/web3-tools/${alternate(info.from)}-to-${alternate(info.to)}-converter`
  }

  useEffect(() => {
    if (!slug) return
    const _info = getInfoBySlug(slug)
    setInfo(_info)

    const _radio = (_info.from === 'number' || _info.to === 'number')
      ? 'number'
      : 'string'
    setFormData(_val => ({ ..._val, radio: _radio }))
  }, [slug])

  const handleRadioChange = val => {
    setFormData(_val => ({ ..._val, radio: val }))

    window.location.href = getRadioSwitchSlug()
  }

  const handleInputChange = (field, value) => {
    const numberRegex = /^\d*$/
    const bytesRegex = /^(0x)?.*$/

    if (field === 'input') {
      if (info.from === 'number') {
        if (!value.match(numberRegex)) return
      }

      if (info.from === 'bytes32') {
        if (!value.match(bytesRegex)) return
      }
    }
    setFormData(_val => ({ ..._val, [field]: value }))
  }

  useEffect(() => {
    if (!formData.input) {
      setFormData(_val => ({ ..._val, result: '' }))
      setError(_val => ({ ..._val, input: false }))
      return
    }

    let fn = () => {}; let args = []

    if (info.from === 'string' && info.to === 'bytes32') {
      fn = stringToBytes32
      args = [formData.input, formData.padding]
    }

    if (info.from === 'number' && info.to === 'bytes32') {
      fn = numberToBytes32
      args = [formData.input]
    }

    if (info.from === 'bytes32' && info.to === 'string') {
      fn = bytes32ToString
      args = [formData.input]
    }

    if (info.from === 'bytes32' && info.to === 'number') {
      fn = bytes32ToNumber
      args = [formData.input]
    }

    try {
      let _result = fn(...args)
      if (_result) {
        if (info.to === 'bytes32' && !_result.startsWith('0x')) _result = '0x' + _result

        setFormData(_val => ({ ..._val, result: _result }))
        setError(_val => ({ ..._val, input: false }))
        return
      }
    } catch {}

    setFormData(_val => ({ ..._val, result: '' }))
    setError(_val => ({ ..._val, input: true }))
  }, [formData.input, formData.padding, info.from, info.to])

  const handlePaddingChange = () => {
    setFormData(_val => ({ ..._val, padding: !_val.padding }))
  }

  useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    }
  }, [copied])

  return (
    <Container>
      <MobileContainer>
        <Breadcrumbs
          crumbs={[
            ...crumbs,
            { name: `${getCapitalizedText(info.from)} to ${getCapitalizedText(info.to)}`, link: '#' }
          ]}
        />
        <TitleContainer>
          <Title>
            Convert {getTitleText(info.from)} to {getTitleText(info.to)}
          </Title>
        </TitleContainer>
      </MobileContainer>

      <FlexContainer>
        <LeftContainer>
          <DesktopContainer>
            <Breadcrumbs
              crumbs={[
                ...crumbs,
                { name: `${getCapitalizedText(info.from)} to ${getCapitalizedText(info.to)}`, link: '#' }
              ]}
            />
            <TitleContainer>
              <Title>
                Convert {getTitleText(info.from)} to {getTitleText(info.to)}
              </Title>
              <SwitchButton href={getSwitchButtonSlug()} scroll={false}>
                <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M4 17h16m0 0-4-4m4 4-4 4m4-14H4m0 0 4-4M4 7l4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>
                <span>{getCapitalizedText(info.to)} to {getCapitalizedText(info.from)}</span>
              </SwitchButton>
            </TitleContainer>
          </DesktopContainer>
          <Form onSubmit={e => e.preventDefault()}>
            <div>
              <InputLabel htmlFor='input-value'>
                Enter Your {getCapitalizedText(info.from)} Value
              </InputLabel>
              <InputContainer>
                <StyledInput
                  autoComplete='off'
                  placeholder={info.inputPlaceholder}
                  id='input-value'
                  value={formData.input}
                  onChange={(e) => handleInputChange('input', e.target.value)}
                  min={0}
                  data-error={error.input ? 'true' : 'false'}
                />
                <StyledTextarea2
                  placeholder={info.inputPlaceholder}
                  id='input-value'
                  value={formData.input}
                  onChange={(e) => handleInputChange('input', e.target.value)}
                  data-error={error.input ? 'true' : 'false'}
                />
                <ButtonContainer>
                  <Tooltip
                    infoComponent={`Enter value in ${info.from} to convert into ${info.to}`}
                  >
                    <button type="button">
  <svg
    view-box="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
  >
    <path
      d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13M12 17H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    ></path>
  </svg>
  <span>Help icon</span>
</button>
                  </Tooltip>
                </ButtonContainer>
              </InputContainer>
            </div>
            <div>
              <InputLabel htmlFor='result-value'>Result</InputLabel>
              <TextareaContainer>
                <StyledTextarea
                  placeholder={info.resultPlaceholder}
                  id='result-value'
                  value={formData.result}
                  onChange={() => {}}
                  disabled
                />
                <CopyButton
                  onClick={() => {
                    handleCopy(formData.result, () => setCopied(true))
                  }}
                  disabled={!formData.result}
                  type='button'
                >
                  {
                      copied
                        ? <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M20 6L9 17L4 12' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>
                        : <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M5 15C4.06812 15 3.60218 15 3.23463 14.8478C2.74458 14.6448 2.35523 14.2554 2.15224 13.7654C2 13.3978 2 12.9319 2 12V5.2C2 4.0799 2 3.51984 2.21799 3.09202C2.40973 2.71569 2.71569 2.40973 3.09202 2.21799C3.51984 2 4.0799 2 5.2 2H12C12.9319 2 13.3978 2 13.7654 2.15224C14.2554 2.35523 14.6448 2.74458 14.8478 3.23463C15 3.60218 15 4.06812 15 5M12.2 22H18.8C19.9201 22 20.4802 22 20.908 21.782C21.2843 21.5903 21.5903 21.2843 21.782 20.908C22 20.4802 22 19.9201 22 18.8V12.2C22 11.0799 22 10.5198 21.782 10.092C21.5903 9.71569 21.2843 9.40973 20.908 9.21799C20.4802 9 19.9201 9 18.8 9H12.2C11.0799 9 10.5198 9 10.092 9.21799C9.71569 9.40973 9.40973 9.71569 9.21799 10.092C9 10.5198 9 11.0799 9 12.2V18.8C9 19.9201 9 20.4802 9.21799 20.908C9.40973 21.2843 9.71569 21.5903 10.092 21.782C10.5198 22 11.0799 22 12.2 22Z' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>
                    }
                  <span>{copied ? 'Copied' : 'Copy Result'}</span>
                </CopyButton>
              </TextareaContainer>
            </div>
          </Form>
        </LeftContainer>
        <RightContainer>
          <OptionsTitle>Options</OptionsTitle>
          <RadioContainer onChange={e => handleRadioChange(e.target.value)}>
            <OptionsLabel>Convert Values {info.to === 'bytes32' ? 'From' : 'To'}</OptionsLabel>
            <RadioButtons>
              <div>
                <input
                  type='radio'
                  id='string-radio'
                  name='convert-from'
                  value='string'
                  checked={formData.radio === 'string'}
                  onChange={() => {}}
                />
                <label htmlFor='string-radio'>String</label>
              </div>
              <div>
                <input
                  type='radio'
                  id='number-radio'
                  name='convert-from'
                  value='number'
                  checked={formData.radio === 'number'}
                  onChange={() => {}}
                />
                <label htmlFor='number-radio'>Number</label>
              </div>
            </RadioButtons>
          </RadioContainer>

          {
              (info.from === 'string' && info.to === 'bytes32') && (
                <PaddingContainer
                  onClick={() => handlePaddingChange()}
                >
                  <div>
                    <PaddingLabel htmlFor='padding-radio'>Add Padding</PaddingLabel>
                    <PaddingInfo>
                      Add trailing zeros to fill up the entire storage space
                    </PaddingInfo>
                  </div>
                  <CircularCheckbox
                    id='padding-radio'
                    name='padding-radio'
                    checked={formData.padding}
                    onChange={() => {}}
                  >
                    Add Padding checkbox
                  </CircularCheckbox>
                </PaddingContainer>
              )
            }
        </RightContainer>

      </FlexContainer>

      <MobileContainer2>
        <SwitchButton href={getSwitchButtonSlug()} scroll={false}>
          <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width='20' height='20'><path d='M4 17h16m0 0-4-4m4 4-4 4m4-14H4m0 0 4-4M4 7l4 4' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>
          <span>{getCapitalizedText(info.to)} to {getCapitalizedText(info.from)}</span>
        </SwitchButton>
      </MobileContainer2>
    </Container>
  )
}

const Container = styled.div`
  margin-bottom: 64px;
  padding: 56px 0;
  ${utils.fullWidthContainer}
`

const FlexContainer = styled.div`
  display: flex;
  gap: 64px;
  align-items: flex-start;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
    margin-top: 32px;
    gap: 32px;
  }
`

const MobileContainer = styled.div`
  display: none;

  @media screen and (max-width: 767px) {
    display: block;
  }
`

const MobileContainer2 = styled(MobileContainer)`
  margin-top: 32px;
`

const DesktopContainer = styled.div`
  display: block;

  @media screen and (max-width: 767px) {
    display: none;
  }
`

const LeftContainer = styled.div`
  & > div > div:nth-of-type(1) {  // disabling default margin of Breadcrumb container
    margin-bottom: 0px;
  }

  width: 754px;
  
  @media screen and (max-width: 767px) {
    width: 100%;
  }
`

const TitleContainer = styled.div`
  margin-top: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`

const Title = styled.h2`
  ${typography.styles.displaySm}
  ${typography.weights.semibold}
  
  @media screen and (max-width: 767px) {
    ${typography.styles.displayXs}
  }
`

const IconButtonStyle = css`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 8px;
  ${typography.styles.textSm}
  ${typography.weights.semibold}
  cursor: pointer;
  white-space: nowrap;
  
  @media screen and (max-width: 767px) {
    white-space: normal;
  }

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
    background-color: ${colors.gray[500]};
  }
`

const SwitchButton = styled.a`
  ${IconButtonStyle}
  background-color: ${colors[primaryColorKey][600]};
  width: max-content;
  
  span, svg {
    color: ${colors.white}; 
  }
`

const Form = styled.form`
  margin-top: 32px;

  & > *:not(:nth-of-type(1)) {
    margin-top: 32px;
  }

  @media screen and (max-width: 767px) {
    margin-top: 0px;
  }
`

const mobileOnly = css`
  display: none;
  
  @media screen and (max-width: 767px) {
    display: block;
  }
`

const InputLabel = styled.label`
  display: block;
  margin-bottom: 6px;
  ${typography.styles.textSm}
  ${typography.weights.medium}

  color: ${colors.gray[700]};
  .dark & {
    color: ${colors.gray[300]};
  }
`

const InputStyle = css`
  border-radius: 8px;

  border: 1px solid ${colors.gray[300]};
  .dark & {
    border: 1px solid ${colors.gray[500]};
  }

  background: ${'transparent'};
  .dark & {
    background: ${colors.gray[600]};
  }
  position: relative;
  ${typography.styles.textMd}
  ${typography.weights.regular}

  &:is(:focus,:active,:focus-visible) {
    --shadow: ${colors[primaryColorKey]['100']};
    .dark & {
      --shadow: ${colors[primaryColorKey]['800']};
    }

    box-shadow: ${shadows.xs},
        0px 0px 0px 4px var(--shadow);

    &[data-error='true'] {
      --shadow: ${colors.error[100]};
      .dark & {
        --shadow: ${colors.error[900] + '90'};
      }
    }
  }

  outline: none;
  width: 100%;

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */

    color: ${colors.gray['500']};
    .dark & {
      color: ${colors.gray['300']};
    }
    opacity: 1; /* Firefox */
  }

  :-ms-input-placeholder { /* Internet Explorer 10-11 */

    color: ${colors.gray['500']};
    .dark & {
      color: ${colors.gray['300']};
    }
  }

  ::-ms-input-placeholder { /* Microsoft Edge */

    color: ${colors.gray['500']};
    .dark & {
      color: ${colors.gray['300']};
    }
  }
  
  &[data-error='true'] {
    border: 1px solid ${colors.error[700]};
  }
`

const ButtonContainer = styled.div``

const InputContainer = styled.div`
  --input-padding-x: 14px;
  --input-padding-y: 10px;
  position: relative;

  ${ButtonContainer} {
    position: absolute;
    right: var(--input-padding-x);
    top: 50%;
    transform: translateY(-50%);

    @media screen and (max-width: 767px) {
      transform: translateY(0%);
      top: var(--input-padding-y);
      right: var(--input-padding-x);
    }
  }

  button {
    padding: 8px;
    padding-right: 0px;

    background-color: ${colors.white};
    .dark & {
      background-color: ${colors.gray[600]};
    }

    @media screen and (max-width: 767px) {
      padding: 0;
    }
    
    svg {
  
      color: ${colors.gray[400]};
      .dark & {
        color: ${colors.gray[50]};
      }
    }

    span {
      ${utils.srOnly};
    }
  }
`

const StyledInput = styled.input`
  ${InputStyle}
  padding: var(--input-padding-y) var(--input-padding-x);

  height: 44px;
  resize: none;

  @media screen and (max-width: 767px) {
    display: none;
  }


  -moz-appearance: textfield; /* Firefox */

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`

const TextareaContainer = styled.div`
  --textarea-padding-x: 14px;
  position: relative;
  height: max-content;

`

const StyledTextarea = styled.textarea`
  ${InputStyle}
  padding: 12px var(--textarea-padding-x);

  height: 108px;
  resize: none;

  @media screen and (max-width: 767px) {
    height: 168px;
  }

  &:disabled {
    color: initial;
  }
`

const StyledTextarea2 = styled(StyledTextarea)`
  ${mobileOnly}
  padding: 10px 14px;
  height: 100px;
  
  @media screen and (max-width: 767px) {
    padding-right: 38px;
  }
`

const CopyButton = styled.button`
  ${IconButtonStyle};
  position: absolute;
  bottom: 16px;
  right: 14px;
  color: ${colors.white};
  background-color: ${colors[primaryColorKey][600]};

`

const RightContainer = styled.div`
  padding: 24px;
  

  border: 1px solid ${colors.gray[300]};
  .dark & {
    border: 1px solid ${colors.gray[500]};
  }
  border-radius: 8px;
  width: 398px;

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 16px;
  }  
`

const OptionsTitle = styled.p`
  ${typography.styles.textLg}
  ${typography.weights.semibold}
`

const RadioContainer = styled.fieldset`
  margin-top: 16px;
`

const OptionsLabel = styled.legend`
  ${typography.styles.textSm}
  ${typography.weights.medium}

  color: ${colors.gray[700]};
  .dark & {
    color: ${colors.gray[25]};
  }
`

const RadioButtons = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: flex-start;
  gap: 16px;
  ${typography.styles.textSm}
  ${typography.weights.medium}

  color: ${colors.gray[700]};
  .dark & {
    color: ${colors.white};
  }

  div {
    display: flex;
    align-items: center;
  }

  input[type="radio"] {
    width: 16px;
    height: 16px;


    accent-color: ${colors[primaryColorKey][600]};
    .dark & {
      accent-color: ${colors[primaryColorKey][600]};
    }
  }

  input, label {
    cursor: pointer;
  }

  label {
    margin-left: 8px;
  }
`

const PaddingContainer = styled.button`
  margin-top: 24px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 4px;

  background-color: ${colors.gray[50]};
  .dark & {
    background-color: ${colors.gray[600]};
  }

  border: 2px solid ${colors.gray[400]};
  .dark & {
    border: 2px solid ${colors.gray[500]};
  }
  border-radius: 12px;
  text-align: left;
  cursor: pointer;

  input[type="radio"] {
    width: 16px;
    height: 16px;
  }

  label {
    ${utils.srOnly}
  }
`

const PaddingLabel = styled.p`
  ${typography.styles.textSm}
  ${typography.weights.medium}

  color: ${colors.gray[700]};
  .dark & {
    color: ${colors.white};
  }
`

const PaddingInfo = styled.p`
  ${typography.styles.textSm}
  ${typography.weights.regular}

  color: ${colors.gray[600]};
  .dark & {
    color: ${colors.gray[25]};
  }
`
