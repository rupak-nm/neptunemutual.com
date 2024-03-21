import { Fragment, id } from 'ethers/lib/utils'

const getEventFragment = (str) => {
  const frag = Fragment.from(str)

  if (frag.type === 'event') {
    return frag
  }

  throw Error(`Invalid event ${str}`)
}

const getEventTopic = (str) => {
  return id(getEventFragment(str).format())
}

const getArgsString = (iface, log) => {
  try {
    const args = iface.parseLog(log).args

    const parsedArgs = {}
    Object.entries(args).forEach(([key, value]) => {
      if (!isNaN(key)) {
        return
      }

      if (Array.isArray(value)) {
        value = value.map(v => (v.toString()))
        parsedArgs[key] = value
      } else {
        parsedArgs[key] = (value.toString())
      }

      if (value._isBigNumber) {
        parsedArgs[key] = value.toString()
      }
    })

    return JSON.stringify(parsedArgs, null, 2)
  } catch (error) {
    console.error(error)
  }

  return ''
}

export {
  getEventTopic,
  getArgsString
}
