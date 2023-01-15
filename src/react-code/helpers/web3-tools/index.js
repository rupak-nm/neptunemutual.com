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

export const bytes32ToString = (bytes32Str) => {
  return parseBytes32String(bytes32Str)
}

export const stringToBytes32 = (str, addPadding) => {
  if (addPadding) {
    return formatBytes32String(str)
  }

  return hexlify(toUtf8Bytes(str))
}

export const bytes32ToNumber = (bytes32Str) => {
  const num = new BigNumber(bytes32Str)
  return num.toNumber()
}

export const numberToBytes32 = (numberStr) => {
  const num = new BigNumber(numberStr)
  const _bytes = num.toString(16)
  return _bytes
}

/*
console.log(bytes32ToNumber('0x6f6b780000000000000000000000000000000000000000000000000000000000')) // 5.039660703823547e+76
console.log(numberToBytes32('7302008')) // 0x6f6b780000000000000000000000000000000000000000000000000000000000
console.log(bytes32ToString('0x6f6b780000000000000000000000000000000000000000000000000000000000')) // okx
console.log(stringToBytes32('okx', true)) // 0x6f6b780000000000000000000000000000000000000000000000000000000000
console.log(stringToBytes32('okx', false)) // 0x6f6b78
*/
