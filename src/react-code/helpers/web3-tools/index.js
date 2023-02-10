import BigNumber from 'bignumber.js'

import { hexlify } from '@ethersproject/bytes'
import {
  formatBytes32String,
  parseBytes32String,
  toUtf8Bytes
} from '@ethersproject/strings'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80
})

const bytes32ToString = (bytes32Str) => {
  return parseBytes32String(bytes32Str)
}

const stringToBytes32 = (str, addPadding) => {
  if (addPadding) {
    return formatBytes32String(str)
  }

  return hexlify(toUtf8Bytes(str))
}

const bytes32ToNumber = (bytes32Str) => {
  const num = new BigNumber(bytes32Str)
  return num.toNumber()
}

const numberToBytes32 = (numberStr) => {
  const num = new BigNumber(numberStr)
  const _bytes = num.toString(16)
  return _bytes
}

export { bytes32ToNumber, bytes32ToString, numberToBytes32, stringToBytes32 }
