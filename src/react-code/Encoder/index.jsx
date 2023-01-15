import {
  useEffect,
  useRef,
  useState
} from 'react'

import styled from 'styled-components'

import { Web3ReactProvider } from '@web3-react/core'

import { Breadcrumbs } from '../components/BreadCrumbs'
import { Button } from '../components/Button'
import { InputWithLabel } from '../components/InputWithLabel'
import { TextArea } from '../components/TextArea'
import { getLibrary } from '../lib/connect-wallet/utils/web3'
import { colors } from '../styles/colors'
import { lightTheme } from '../styles/theme'
import { typography } from '../styles/typography/'
import { utils } from '../styles/utils'
import {
  isArray,
  isJSON,
  isValidAbi
} from './helpers'
import { History } from './History'
import { Result } from './Result'

const STORAGE_KEY = 'abis'

const Encoder = () => {
  const formRef = useRef()

  const [contracts, setContracts] = useState([])
  const [abiInvalidFormat, setAbiInvalidFormat] = useState(false)
  const [isSaveable, setIsSaveable] = useState(false)
  const [restorationFailed, setRestorationFailed] = useState(false)

  const [contractName, setContractName] = useState('')
  const [address, setAddress] = useState('')
  const [abi, setAbi] = useState('[]')

  useEffect(() => {
    const storageData = window.localStorage.getItem(STORAGE_KEY)
    if (isJSON(storageData)) {
      setContracts(JSON.parse(storageData) || [])
    } else {
      window.localStorage.removeItem(STORAGE_KEY)
    }
  }, [])

  const restoreSpecificCallback = (data) => {
    const { abi, contractName, address } = data
    const form = formRef.current
    form.abi.value = abi
    form.contract_name.value = contractName
    form.address.value = address
    setContractName(contractName)
    setAddress(address)
    setAbi(abi)
    setIsSaveable(true)
    validateABI({ target: { value: abi } })
  }

  const saveToStorage = (e) => {
    e.preventDefault()
    let abis = []
    const form = formRef.current

    const isAbiJson = isJSON(form.abi.value)

    if (!isAbiJson) {
      return true
    }

    const storageData = window.localStorage.getItem(STORAGE_KEY)

    if (isJSON(storageData)) {
      abis = JSON.parse(storageData) || []
    }

    const data = {
      abi: form.abi.value,
      contract_name: form.contract_name.value,
      address: form.address.value
    }

    abis.push(data)
    setContracts(abis)

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(abis))
  }

  const download = (e) => {
    e.preventDefault()

    const file = new window.Blob([JSON.stringify(contracts)], { type: 'text/json;charset=utf-8' })

    const element = document.createElement('a')
    element.href = URL.createObjectURL(file)
    element.download = 'contracts.json'
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const restore = (e) => {
    e.preventDefault()
    const element = document.createElement('input')
    element.type = 'file'
    element.onchange = processFile
    document.body.appendChild(element)
    element.click()
    element.remove()
  }

  const processFile = (e) => {
    e.stopPropagation()
    e.preventDefault()
    setRestorationFailed(false)

    const file = e.target.files[0]
    const reader = new window.FileReader()
    reader.onload = (evt) => {
      try {
        const contracts = JSON.parse(evt.target.result)
        setContracts(contracts)
        window.localStorage.setItem(STORAGE_KEY, evt.target.result)
      } catch (error) {
        // Show an error
        setRestorationFailed(true)
        console.log(error)
      }
    }

    reader.readAsText(file)
  }

  const validateABI = (e) => {
    const abi = e.target.value

    if (abi === '') {
      return setAbiInvalidFormat(false)
    }

    const isValidAbiString = isJSON(abi) && isArray(abi) && isValidAbi(abi)

    if (isValidAbiString && typeof JSON.parse(abi) === 'object') {
      setAbi(abi)
    }
    setIsSaveable(isValidAbiString)
    setAbiInvalidFormat(!isValidAbiString)
  }

  return (
    <Container>
      <FormContainer>
        <div>
          <Breadcrumbs
            crumbs={[
              { name: 'Home', link: '/' },
              { name: 'Web3 Tools', link: '/web3-tools' },
              { name: 'ABI Encoder', link: null }
            ]}
          />

          <FormContent ref={formRef}>
            <TextArea
              required
              label='What is your contract ABI?'
              placeholder='Paste your smart contract or interface ABI code here'
              onChange={validateABI}
              error={abiInvalidFormat ? 'ABI format is invalid.' : ''}
              rows={5}
              id='abi'
            />

            <InputWithLabel
              required
              label='How would you want to remember your contract name in the future?'
              placeholder='Contract or interface name'
              id='contract_name'
              onChange={(e) => { return setContractName(e.target.value) }}
            >
              <InputHint>
                Enter the contract name or an easy way to remember name for this contract
              </InputHint>
            </InputWithLabel>

            <InputWithLabel
              required
              label='Have you deployed this contract on a blockchain network?'
              placeholder='0x'
              id='address'
              onChange={(e) => { return setAddress(e.target.value) }}
            >
              <InputHint>
                If you’d like to perform read and write operations on this contract, paste its address.
              </InputHint>
            </InputWithLabel>

            <FormAction>
              <Button
                hierarchy='secondary'
                disabled={!isSaveable}
                size='sm'
                iconLeading
                iconVariant='folder'
                onClick={saveToStorage}
              >
                Save to Local Storage
              </Button>
              <Button
                hierarchy='secondary'
                disabled={contracts.length === 0}
                size='sm'
                iconLeading
                iconVariant='download-cloud-01'
                onClick={download}
              >
                Save All to Your Computer
              </Button>
              <Button
                hierarchy='secondary'
                size='sm'
                type='file'
                iconLeading
                iconVariant='refresh-ccw-02'
                onClick={restore}
              >
                Restore from Your Computer
              </Button>
            </FormAction>
          </FormContent>
        </div>

        <History
          contracts={contracts}
          download={download}
          restore={restore}
          restorationFailed={restorationFailed}
          restoreSpecificCallback={restoreSpecificCallback}
        />
      </FormContainer>

      <Web3ReactProvider getLibrary={getLibrary}>
        <Result
          title={contractName}
          address={address}
          abi={JSON.parse(abi)}
        />
      </Web3ReactProvider>

    </Container>
  )
}

const Container = styled.div`
  ${utils.fullWidthContainer}
  padding-bottom: 96px;
  
  @media (max-width: 767px) {
    padding-bottom: 64px;
  }
`

const FormContainer = styled.div`
  display: flex;
  margin-top: 24px;
  gap: 40px;
  flex-direction: column-reverse;

  @media (min-width: 1024px) { 
    flex-direction: row;
    gap: 64px;
    margin-top: 56px;
  }
`

const FormContent = styled.form`
  display: flex;
  gap: 32px;
  flex-direction: column;
  width: 100%;

  @media (min-width: 1024px) { 
    width: 754px;  
  }
`

const FormAction = styled.div`
  display: flex;

  @media (max-width: 767px) {
    flex-direction: column;
  }
  
  button {
    background-color: ${lightTheme.primaryBackgroundColor};
    border-radius: 0;
    border: 1px solid ${colors.gray[300]};
    color: ${colors.gray[700]};

    &:nth-of-type(1) {
      border-right: none;
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;

      @media (max-width: 767px) {
        border: 1px solid ${colors.gray[300]};
        border-top-right-radius: 8px;
        border-bottom-left-radius: 0;
        border-bottom: none;
      }
    }
    
    &:nth-last-of-type(1) {
      border-left: none;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;

      @media (max-width: 767px) {
        border: 1px solid ${colors.gray[300]};
        border-top-right-radius: 0;
        border-bottom-left-radius: 8px;
        border-top: none;
      }
    }

    .dark & {
      background-color: ${colors.gray[600]};
      border: 1px solid ${colors.gray[500]};
      color: ${colors.white};

      @media (min-width: 768px) { 
        border-right-color: ${colors.gray[50]};
        border-left-color: ${colors.gray[50]};
      }

      &:nth-of-type(1) {
        border-left-color: ${colors.gray[600]};

        @media (max-width: 767px) {
          border: 1px solid ${colors.gray[500]};
        }
      }

      &:nth-last-of-type(1) {
        border-right-color: ${colors.gray[500]};

        @media (max-width: 767px) {
          border: 1px solid ${colors.gray[500]};
        }
      }
    }
  }
`

const InputHint = styled.p`
  margin-top: 6px;
  color: ${colors.gray['600']};
  ${typography.styles.textSm};
  ${typography.weights.regular};

  a {
    text-decoration: underline;


    &:hover, &:active{
      color: ${colors.rose[600]};
    }
  }

  .dark & {
    color: ${colors.gray['50']};
  }
`

export { Encoder }
