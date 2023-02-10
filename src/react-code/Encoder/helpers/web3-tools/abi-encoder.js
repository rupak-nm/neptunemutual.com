import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import Joi from 'joi'

const getPlaceholder = (type) => {
  const _getPlaceholder = (_type) => {
    let _val = ''
    switch (_type) {
      case 'uint':
      case 'uint256':
        _val = 111222333
        break

      case 'bytes':
      case 'bytes32':
        _val = '0x112233...'
        break

      case 'address':
        _val = '0x11...22'
        break

      case 'bool':
        _val = 'true'
        break

      default:
        _val = 'hello'
    }

    return _val
  }

  if (type.endsWith('[]')) return `["${_getPlaceholder(type.split('[]')[0])}"]`

  return _getPlaceholder(type)
}

const getJoiType = (type) => {
  const _getType = (_type) => {
    let _joiType = Joi.string()
    switch (_type) {
      case 'address':
        _joiType = Joi.string()
          .length(42)
          .required()
          .alphanum()
          .custom((value, helper) => {
            try {
              ethers.utils.getAddress(value)
              return value
            } catch { }

            return helper.message('Invalid account')
          })
        break

      case 'bytes':
      case 'bytes32':
        _joiType = Joi.string().custom((val, helper) => {
          if (val.startsWith('0x')) return val
          return helper.message('Invalid account')
        })
        break

      case 'uint':
      case 'uint256':
        _joiType = Joi.custom((_val, helper) => {
          try {
            const bn = BigNumber(_val).isPositive()
            return bn || helper.message('invalid value provided')
          } catch { }
          return helper.message('invalid value provided')
        })
        break

      case 'bool':
        _joiType = Joi.boolean()
        break

      default:
        _joiType = Joi.string()
        break
    }

    return _joiType
  }

  const _type = type.split('[]')[0]
  const joiType = _getType(_type)
  return type.endsWith('[]')
    ? Joi.string().custom((_val, helper) => {
      try {
        const _parsed = JSON.parse(_val)
        if (_parsed) return Joi.array().items(joiType).validate(_parsed)
      } catch { }
      return helper.message('must be valid json')
    })
    : joiType
}

const createJoiSchema = inputs => {
  if (inputs?.length) {
    const _joiSchema = {}

    inputs.map(i => {
      _joiSchema[i.name] = getJoiType(i.type)
      return true
    })

    return Joi.object(_joiSchema)
  }
}

const checkInputErrors = (_schema, _inputData) => {
  if (_schema && _inputData) {
    const { error: _error } = _schema.validate(_inputData)
    if (_error) return true
  }

  return false
}

const isInputError = (_schema, _inputData, _field) => {
  if (_schema && _inputData[_field]) {
    const { error: _error } = _schema.validate(_inputData, { abortEarly: false })

    if (_error && _error.details.find(d => d.path.includes(_field))) return true
  }
  return false
}

export {
  checkInputErrors,
  createJoiSchema,
  getJoiType,
  getPlaceholder,
  isInputError
}
