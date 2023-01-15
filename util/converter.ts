import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: 99, DECIMAL_PLACES: 50 })

const getPowerValue = (unit: ConversionUnits): number => {
  let _power
  switch (unit) {
    case 'kWei':
      _power = 3
      break

    case 'mWei':
      _power = 6
      break

    case 'gWei':
      _power = 9
      break

    case 'szabo':
      _power = 12
      break

    case 'finney':
      _power = 15
      break

    case 'ether':
      _power = 18
      break

    case 'kEther':
      _power = 21
      break

    case 'mEther':
      _power = 24
      break

    case 'gEther':
      _power = 27
      break

    case 'tEther':
      _power = 30
      break

    default:
      _power = 0
      break
  }

  return _power
}

const convertFromWei = (to: ConversionUnits, x: (string | number)): string => {
  const _pow = getPowerValue(to)
  const value = new BigNumber(x.toString()).dividedBy(new BigNumber(10).pow(_pow)).toString()
  return value
}

const convertToWei = (from: ConversionUnits, x: (string | number)): string => {
  const _pow = getPowerValue(from)
  const value = new BigNumber(x.toString()).multipliedBy(new BigNumber(10).pow(_pow)).toString()
  return value
}

export { convertFromWei, convertToWei }
