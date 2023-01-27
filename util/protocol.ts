import { constants } from 'ethers'

import { parseBytes32String } from '@ethersproject/strings'

export enum Networks {
  Ethereum = 1,
  Arbitrum = 42161,
  Fuji = 43113
}

export const protocolTitles: Record<number, string> = {
  [Networks.Ethereum]: 'Neptune Mutual on Ethereum',
  [Networks.Arbitrum]: 'Neptune Mutual on Arbitrum',
  [Networks.Fuji]: 'Neptune Mutual on Fuji (Testnet)'
}

export const protocolDomains: Record<number, string> = {
  [Networks.Ethereum]: 'https://ethereum.neptunemutual.net',
  [Networks.Arbitrum]: 'https://arbitrum.neptunemutual.net',
  [Networks.Fuji]: 'https://test.neptunemutual.net'
}

export const protocolLabels: Record<string, string> = {
  contracts: 'Protocol Contracts & Tokens',
  cxTokens: 'cxTokens',
  pods: 'PODs (Vault Contracts)'
}

const baseExplorerUrl: Record<number, string> = {
  [Networks.Ethereum]: 'https://etherscan.io',
  [Networks.Arbitrum]: 'https://arbiscan.io',
  [Networks.Fuji]: 'https://testnet.snowtrace.io'
}

export const getExplorerUrl = (networkId: number, address: string): string => {
  const baseUrl = baseExplorerUrl[networkId]

  return `${baseUrl}/address/${address}`
}

export const getContractData = (data: Array<KeyValuePair<string>> | CxToken[], type: string): Array<{ name: string, address: string }> => {
  const result = data.map(val => {
    if (type === 'contracts') {
      return {
        name: val?.key,
        address: val?.value
      }
    }

    let _key = ''
    if (type === 'cxTokens') {
      _key = val?.productKey && val?.productKey !== constants.HashZero ? val?.productKey : val?.coverKey
    }

    if (type === 'pods') {
      _key = val?.key
    }

    const name = bytes32ToString(_key)
    return {
      name,
      address: val?.value
    }
  })

  return result
}

export function bytes32ToString(bytes32Str: string): string {
  try {
    return parseBytes32String(bytes32Str)
  } catch (error) {
    console.error(error)
  }
  return ''
}
