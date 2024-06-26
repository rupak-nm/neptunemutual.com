import './Result.scss'

import { useMemo, useState } from 'react'

import { Interface } from '@ethersproject/abi'

import { Button } from '../components/Button/Button'
import { ConnectWallet } from '../components/ConnectWallet/ConnectWallet'
import { Func } from './Func'
import { useContractCall } from './hooks/useContractCall'
import { DecodeData } from './FunctionType/decode'
import { Events } from './FunctionType/events'

const filter = {
  encode_data: {
    stateMutability: '[a-z]'
  },
  read_contract: {
    stateMutability: '(view|pure)'
  },
  write_contract: {
    stateMutability: '^(?!(view|pure))'
  },
  decode_data: {
    stateMutability: '[a-z]'
  }
}

const Result = (props) => {
  const [type, setType] = useState('encode_data')

  const { abi, address, title } = props

  const { callMethod, isReady } = useContractCall({
    abi,
    address
  })

  const handleType = (e) => {
    e.preventDefault()
    const _type = e.currentTarget.getAttribute('data-value')
    setType(_type)
  }

  const validateStateMutability = (stateMutability) => {
    const re = new RegExp(filter[type].stateMutability)
    return re.test(stateMutability)
  }

  const ethersInterface = new Interface(abi)

  const functions = useMemo(() => {
    if (!Array.isArray(abi) || type === 'decode_data') {
      return []
    }

    return abi.filter((func) => {
      if (type === 'view_events') {
        return func.type === 'event'
      }

      return func.type === 'function' && validateStateMutability(func.stateMutability)
    })
  }, [abi, type])

  return (
    <div className='result container'>
      <div>
        {title && <div className='result title'>{title}</div>}
        {address && <div className='result address'>{address}</div>}
      </div>

      {Array.isArray(abi) && abi.length > 0 && (
        <div className='result cta'>
          <div className='left group'>
            <Button
              variant='secondary-gray'
              data-active={type === 'encode_data'}
              size='sm'
              data-value='encode_data'
              onClick={handleType}
            >
              Encode Data
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'decode_data'}
              size='sm'
              data-value='decode_data'
              onClick={handleType}
            >
              Decode Data
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'read_contract'}
              size='sm'
              data-value='read_contract'
              onClick={handleType}
            >
              Read Contract
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'write_contract'}
              size='sm'
              data-value='write_contract'
              onClick={handleType}
            >
              Write Contract
            </Button>
            <Button
              variant='secondary-gray'
              data-active={type === 'view_events'}
              size='sm'
              data-value='view_events'
              onClick={handleType}
            >
              View Events
            </Button>
          </div>
          <div className='right group'>
            {
              !['encode_data', 'decode_data'].includes(type) && (
                <ConnectWallet />
              )
            }
          </div>
        </div>
      )}

      <div className='result list container'>
        {
          type === 'view_events'
            ? (
              <Events address={address} functions={functions} encodeInterface={ethersInterface} />
              )
            : type === 'decode_data'
              ? <DecodeData encodeInterface={ethersInterface} />
              : (
                  functions.map((func, i) => (
                    <Func
                      type={type}
                      key={`func-${i}`}
                      func={func}
                      count={i + 1}
                      call={callMethod}
                      isReady={isReady}
                      interface={ethersInterface}
                      abi={abi}
                      address={address}
                    />
                  ))
                )
        }
      </div>
    </div>
  )
}

export { Result }
