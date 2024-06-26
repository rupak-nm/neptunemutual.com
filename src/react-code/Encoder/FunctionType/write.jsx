import './write.scss'

import {
  useCallback,
  useMemo,
  useState
} from 'react'

import { Button } from '../../components/Button/Button'
import {
  getWriteArguments,
  updateObjectByArrayOfKeys
} from '../helpers/web3-tools/abi-encoder'
import { InputFields } from '../components/InputFields'

import { JSONPopup } from '../../components/JSONPopup/JSONPopup'
import { chains } from '../helpers/wallet/chains'
import { useConnectWallet } from '../../packages/web3-core'

const WriteContract = (props) => {
  const [inputData, setInputData] = useState({})
  const [error, setError] = useState('')
  const [makingCall, setMakingCall] = useState(false)
  const [hash, setHash] = useState('')

  const [parsedJSON, setParsedJSON] = useState(null)

  const { connectedChainId: chainId } = useConnectWallet()
  const explorerUrl = useMemo(() => {
    const explorer = chains[chainId]?.explorer
    return explorer ? explorer + '/tx/' : ''
  }, [chainId])

  const { func, call, joiSchema, isReady, encodeInterface: iface } = props
  const { inputs, name } = func

  const handleWrite = useCallback(async (_inputData) => {
    setError('')
    setHash('')
    setMakingCall(true)

    const methodName = name
    const methodArgs = getWriteArguments(_inputData, inputs)

    const hasPayableStateMutability = func?.stateMutability === 'payable'
    const value = _inputData[name]

    const { error: _error, hash: _hash } = await call(methodName, methodArgs, hasPayableStateMutability && { value }, iface)

    if (_hash) {
      setHash(_hash)
    }

    if (_error) {
      setError(_error)
    }

    setMakingCall(false)
  }, [call, name, func, iface, inputs])

  const handleInputChange = (value = '', keyArray) => {
    const updatedObject = updateObjectByArrayOfKeys(inputData, keyArray, value)
    setInputData({ ...updatedObject })

    if (error) {
      setError('')
    }
  }

  const handleJSON = (json) => {
    handleWrite(json)
  }

  return (
    <div className='write container'>
      {
        inputs.length > 0 && (
          <JSONPopup
            handleJSON={handleJSON}
            parsedJSON={parsedJSON}
            setParsedJSON={setParsedJSON}
            label={`Enter JSON for writing with ${name} function`}
            btnProps={{ label: 'Write', disabled: !isReady || makingCall }}
          />
        )
      }

      <InputFields
        func={func}
        inputData={inputData}
        handleChange={handleInputChange}
        schema={joiSchema}
      />

      <div className='btn wrapper'>
        <Button
          variant='primary'
          size='sm'
          onClick={() => handleWrite(inputData)}
          disabled={!isReady || makingCall
            // checkEmptyInputs(inputs, inputData, name, stateMutability) ||
            // checkInputErrors(joiSchema, inputData) ||
          }
        >
          {makingCall ? 'Transaction in progress...' : 'Write'}
        </Button>

        {
          (hash && explorerUrl) && (
            <Button
              type='anchor'
              size='sm'
              href={explorerUrl + hash}
              target="_blank"
              rel="noreferrer nofollow"
            >
              View Transaction
            </Button>
          )
        }
        <span className='error'>{error}</span>
      </div>

    </div>
  )
}

export { WriteContract }
