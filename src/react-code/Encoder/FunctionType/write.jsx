import {
  useId,
  useState
} from 'react'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { InputWithLabel } from '../../components/InputWithLabel'
import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { typography } from '../../styles/typography'
import {
  checkInputErrors,
  getPlaceholder,
  isInputError
} from '../helpers/web3-tools/abi-encoder'

const WriteContract = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  const { func, inputs, tupleInputs, call, joiSchema, isReady } = props

  async function handleWrite () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = func.name
    const _inputData = JSON.parse(JSON.stringify(inputData))
    inputs.map(i => {
      const _val = inputData[i.name]
      if (i.type.endsWith('[]')) {
        try {
          const _parsed = JSON.parse(_val)
          if (_parsed && Array.isArray(_parsed)) _inputData[i.name] = _parsed
        } catch {}
      }
      return true
    })
    const args = tupleInputs ? [_inputData] : Object.values(_inputData)

    const res = await call(methodName, args)

    if (res.error) setError(res.error)
    else setError('')

    setMakingCall(false)
  }

  const handleInputChange = (name, value = '') => {
    setInputData(_prev => ({ ..._prev, [name]: value }))
    if (error) setError('')
  }

  return (
    <Container>
      {inputs.map((input, i) => {
        return (
          <InputWithLabel
            key={`input-${i}`}
            label={`${input.name} (${input.type})`}
            placeholder={getPlaceholder(input.type)}
            id={`${id}-${i}`}
            onChange={e => handleInputChange(input.name, e.target.value, input.type)}
            error={
              isInputError(joiSchema, inputData, input.name)
                ? `Invalid value for type: ${input.type}`
                : ''
            }
            errorIcon='alert-circle'
          />
        )
      })}

      <BtnWrapper>
        <Btn
          hierarchy='primary'
          size='sm'
          onClick={handleWrite}
          disabled={!isReady || checkInputErrors(joiSchema, inputData) || makingCall}
        >
          Write
        </Btn>
        <span className='error'>{error}</span>
      </BtnWrapper>

    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${colors[primaryColorKey][25]};
  padding: 32px 24px;
  gap: 24px;

  input[data-error="true"] {
    border-color: ${colors.error[300]};
  }

  p, svg {
    color: ${colors.error[500]};
  }

  .dark & {
    background-color: ${colors.gray[900]};
  }
`

const Btn = styled(Button)`
  width: fit-content;
  ${typography.weights.semibold}
  ${typography.styles.textSm}

  &:disabled {
    opacity: 0.8;
    color: ${colors.gray[400]};
  }
`

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  
  @media screen and (max-width: 767px) {
    align-items: flex-start;
    flex-direction: column;
  }

  span.error {
    ${typography.styles.textSm}
    color: ${colors.error[700]};
  }
`

export { WriteContract }
