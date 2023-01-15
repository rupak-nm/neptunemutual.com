import {
  Fragment,
  useId,
  useState
} from 'react'

import styled from 'styled-components'

import { Button } from '../../components/Button'
import { Icon } from '../../components/Icon'
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

const ReadContract = (props) => {
  const id = useId()

  const { func, call, inputs, joiSchema, isReady } = props

  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState(func.outputs)
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)

  function getFunctionSignature () {
    const _func = func
    return `${_func.name}(${_func.inputs.map(_inp => _inp.type).join(', ')})`
  }

  function getOutputsSignature () {
    const _func = func
    return `${_func.outputs.map(_inp => _inp.type).join(', ')}`
  }

  async function handleQuery () {
    if (error) setError('')
    setMakingCall(true)

    const methodName = func.name
    const args = Object.values(inputData)
    const outputs = await call(methodName, args)

    if (outputs && !outputs.error) {
      const _outputData = func.outputs.map((o, i) => ({
        ...o,
        value: outputs[i]?.toString()
      }))
      setOutputData(_outputData)
    }

    if (outputs?.error) setError(outputs.error)
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
            onChange={e => handleInputChange(input.name, e.target.value)}
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
          hierarchy='secondary'
          onClick={handleQuery}
          disabled={!isReady || checkInputErrors(joiSchema, inputData) || makingCall}
        >
          Query
        </Btn>
        <span className='error'>{error}</span>
      </BtnWrapper>

      <Output>
        <Icon variant='L' size={10} />
        {getOutputsSignature()}
      </Output>
      {outputData.map((output, i) => {
        return (
          <Fragment key={`output-${i}`}>
            {
              output.value && (
                <ResultContainer>
                  <ResultTitle>
                    [<Bold>{getFunctionSignature()}</Bold> method Response]
                  </ResultTitle>
                  <Result>
                    <Icon variant='chevron-right-double' size={18} />
                    <span>{(output.type)}: {output.value}</span>
                  </Result>
                </ResultContainer>
              )
            }
          </Fragment>
        )
      })}

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

  &:disabled {
    opacity: 1;
  }

  .dark & {
    opacity: 0.75;
  }
`
const Output = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  color: ${colors.gray[900]};
  font-style: italic;
  ${typography.weights.regular}
  ${typography.styles.textSm}

  .dark & {
    color: ${colors.white};
  }
`

const ResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const ResultTitle = styled.span`
  ${typography.styles.textSm}
`

const Bold = styled.span`
  ${typography.weights.semibold}
`

const Result = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  font-style: italic;
  ${typography.styles.textSm}

  span {
    color: ${colors.black}
  }

  svg {
    color: ${colors.success[700]} !important;
  }

  .dark & {
    span {
      color: ${colors.white}
    }

    svg {
      color: ${colors.success[500]} !important;
    }
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

export { ReadContract }
