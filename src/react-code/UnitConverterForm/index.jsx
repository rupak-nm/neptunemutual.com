import React, {
  useEffect,
  useState
} from 'react'

import {
  convertFromWei,
  convertToWei
} from '../../../util/converter'
import {
  extendedFields,
  simpleFields
} from '../../data/ethereum-unit-converter-fields'
import { Breadcrumbs } from '../Breadcrumbs'

const DEFAULT_CHECKED = 'extended'

function Header (props) {
  return (
    <>
      <Breadcrumbs crumbs={[
        ...props.crumbs,
        { name: 'Ethereum Unit Converter', link: '#' }
      ]}
      />
      <h2>Convert Ethereum Denominations</h2>
    </>
  )
}

export default function UnitConverterForm (props) {
  const [fields, setFields] = useState([...extendedFields])
  const [checked, setChecked] = useState(DEFAULT_CHECKED)
  const [inputValueAndType, setInputValueAndType] = useState({})

  useEffect(() => {
    if (inputValueAndType?.value && inputValueAndType?.type) {
      handleInput(inputValueAndType.type, inputValueAndType.value)
    }
  }, [checked])

  const handleOption = e => {
    setFields(e.target.value === DEFAULT_CHECKED ? [...extendedFields] : [...simpleFields])
    setChecked(e.target.value)
  }

  const handleInput = (type, value) => {
    const _wei = convertToWei(type, value)
    const _fields = [...fields]

    for (const x in _fields) {
      if (value > 0) {
        if (type === _fields[x].type) _fields[x].value = value
        else _fields[x].value = convertFromWei(_fields[x].type, _wei)
      } else {
        _fields[x].value = ''
      }
    }

    setInputValueAndType({ type, value })
    setFields(_fields)
  }

  return (
    <div className='ethereum unit converter'>
      <div className='left container'>
        <div className='desktop header'>
          <Header crumbs={props.crumbs} />

        </div>
        <form>
          {fields.map((field, i) => {
            return (
              <div key={`input-container-${i}`}>
                <label htmlFor={`l-${i}`}>{field.name}</label>
                <div className='input container'>
                  <input id={`l-${i}`} value={field?.value} placeholder={field.placeHolder} onChange={(e) => handleInput(field.type, e.target.value)} />
                </div>
              </div>
            )
          })}
        </form>
      </div>
      <div className='right container'>
        <div className='option container'>
          <legend>Options</legend>
          <div className='options'>
            <div className='option'>
              <input type='radio' checked={checked === 'extended'} id='extended-radio' value='extended' onChange={handleOption} />
              <label htmlFor='extended-radio'>Extended Converter</label>
            </div>
            <div className='option'>
              <input type='radio' checked={checked === 'simple'} id='simple-radio' value='simple' onChange={handleOption} />
              <label htmlFor='simple-radio'>Simple Converter</label>
            </div>
          </div>
        </div>
      </div>
      <div className='mobile header'>
        <Header crumbs={props.crumbs} />
      </div>
    </div>
  )
}
