import {
  useEffect,
  useId,
  useState
} from 'react'

import styled from 'styled-components'

import { InputWithLabel } from '../../components/InputWithLabel'
import { TextArea } from '../../components/TextArea'
import {
  colors,
  primaryColorKey
} from '../../styles/colors'
import { typography } from '../../styles/typography'
import {
  encodeData,
  getFunctionSignature
} from '../helpers/solidity/methods'
import {
  getPlaceholder,
  isInputError
} from '../helpers/web3-tools/abi-encoder'

const EncodeData = (props) => {
  const id = useId()
  const [inputData, setInputData] = useState({})
  const [outputData, setOutputData] = useState('')
  const [outputError, setOutputError] = useState('')

  const { inputs, encodeInterface, func, tupleInputs, joiSchema } = props

  useEffect(() => {
    if (inputs?.length === 0) {
      const encoded = encodeData(encodeInterface, func.name)
      if (encoded) setOutputData(encoded)
    }
  }, [func, encodeInterface, inputs])

  const checkNonEmptyInputs = (_inputData) => {
    const nonEmptyInput = inputs.find(i => {
      if (_inputData[i.name]) return true
      return false
    })

    return Boolean(nonEmptyInput)
  }

  const handleChange = (name, value) => {
    setInputData(_prev => ({ ..._prev, [name]: value }))

    const _inputData = ({ ...inputData, [name]: value })
    const signature = getFunctionSignature(func)
    inputs.map(i => {
      const _val = _inputData[i.name]
      if (i.type.endsWith('[]')) {
        try {
          const _parsed = JSON.parse(_val)
          if (_parsed && Array.isArray(_parsed)) _inputData[i.name] = _parsed
        } catch {}
      }
      return true
    })
    let args = Object.values(_inputData)
    args = tupleInputs ? [args] : args

    const encoded = encodeData(encodeInterface, signature, args, (error) => {
      setOutputData('')

      if (checkNonEmptyInputs({ ...inputData, [name]: value })) setOutputError(error)
      else setOutputError('')
    })

    if (encoded) {
      setOutputData(encoded)
      setOutputError('')
    }
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
            onChange={e => handleChange(input.name, e.target.value)}
            error={
              isInputError(joiSchema, inputData, input.name)
                ? `Invalid value for type: ${input.type}`
                : ''
            }
            errorIcon='alert-circle'
          />
        )
      })}

      <ResultContainer>
        <StyledTextArea
          label='Result'
          placeholder='0x'
          id={`${id}-result`}
          rows={5}
          value={outputData}
          onChange={() => {}}
          disabled
        />
        <span>{outputError}</span>
      </ResultContainer>

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

const StyledTextArea = styled(TextArea)`
  &:disabled {
    color: initial;
  }
`

const ResultContainer = styled.div`
  span {
    display: block;
    margin-top: 4px;
    ${typography.styles.textSm};
    color: ${colors.error[700]};
  }
`

export { EncodeData }
