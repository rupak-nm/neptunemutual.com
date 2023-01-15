import {
  useEffect,
  useState
} from 'react'

import styled from 'styled-components'

import { Icon } from '../components/Icon'
import { colors } from '../styles/colors'
import { typography } from '../styles/typography'
import { EncodeData } from './FunctionType/encode'
import { ReadContract } from './FunctionType/read'
import { WriteContract } from './FunctionType/write'
import {
  encodeData,
  getFunctionSignature
} from './helpers/solidity/methods'
import { createJoiSchema } from './helpers/web3-tools/abi-encoder'

const TypeComponent = {
  encode_data: EncodeData,
  read_contract: ReadContract,
  write_contract: WriteContract
}

const defaultData = type => {
  const _type = type.split('[]')[0]
  let _value = ''
  switch (_type) {
    case 'bytes32':
    case 'bytes':
      _value = '0x7465737400000000000000000000000000000000000000000000000000000000'
      break

    case 'uint256':
      _value = '1'
      break

    case 'address':
      _value = '0x0000000000000000000000000000000000000000'
      break

    case 'bool':
      _value = 'true'
      break

    default:
      _value = '0x7465737400000000000000000000000000000000000000000000000000000000'
      break
  }

  return type.endsWith('[]') ? [_value] : _value
}

const Func = (props) => {
  const [isOpen, setIsOpen] = useState(false)

  const { type, func, interface: encodeInterface, count, call, isReady } = props

  const Component = TypeComponent[type]

  const [encodedFn, setEncodedFn] = useState('')
  const inputs = props?.func?.inputs?.[0]?.components || props?.func?.inputs

  useEffect(() => {
    if (type !== 'write_contract') return

    const isTupleInputs = func.inputs[0]?.type === 'tuple'
    let encodeArgs = []
    if (inputs?.length) {
      const _args = inputs.map(i => defaultData(i.type))
      encodeArgs = isTupleInputs ? [_args] : _args
    }

    const encodeName = getFunctionSignature(func)
    const _encodedFn = encodeData(encodeInterface, encodeName, encodeArgs)
    if (_encodedFn) setEncodedFn(_encodedFn.slice(0, 10))
  }, [func, encodeInterface, type, inputs])

  useEffect(() => {
    setIsOpen(false)
  }, [type])

  const toggle = (e) => {
    e.preventDefault()
    setIsOpen(!isOpen)
  }

  return (
    <Container className='item' id={`func-${count}`}>
      <ListHeader onClick={toggle}>
        <Name>{count}. {func.name} {type === 'write_contract' && `(${encodedFn})`}</Name>

        <CallToAction>
          <Button title='Toggle'>
            <Icon size={16} variant={isOpen ? 'chevron-up' : 'chevron-down'} />
          </Button>
        </CallToAction>
      </ListHeader>
      {isOpen &&
        <Component
          type={type}
          func={func}
          inputs={inputs}
          tupleInputs={func.inputs[0]?.type === 'tuple'}
          call={call}
          isReady={isReady}
          encodeInterface={encodeInterface}
          joiSchema={createJoiSchema(inputs)}
        />}
    </Container>
  )
}

const Container = styled.div`
  border: 1px solid ${colors.gray[300]};

  .dark & {
    border: 1px solid ${colors.gray[700]};
  }
`

const ListHeader = styled.div`
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: -1;
  cursor: pointer;
`

const Button = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
`

const Name = styled.div`
  ${typography.weights.semibold}
`

const CallToAction = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  color: ${colors.black};
  /* z-index: 9; */
`

export { Func }
