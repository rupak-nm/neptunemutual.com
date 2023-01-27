import { constants } from 'ethers'

import { parseBytes32String } from '@ethersproject/strings'

import { getMonthName } from './date'

export enum Networks {
  Ethereum = 1,
  Arbitrum = 42161,
  Fuji = 43113
}

export const title: Record<number, string> = {
  [Networks.Ethereum]: 'Neptune Mutual on Ethereum',
  [Networks.Arbitrum]: 'Neptune Mutual on Arbitrum',
  [Networks.Fuji]: 'Neptune Mutual on Fuji (Testnet)'
}

export const domains: Record<number, string> = {
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

export const getKeyValuePairFrom = (cxToken: CxToken): KeyValuePair<string> => {
  const name: Array<string | undefined> = [bytes32ToString(cxToken.coverKey)]
  name.push(cxToken?.productKey !== constants.HashZero ? bytes32ToString(cxToken?.productKey) : undefined)

  name.push(getMonthName(cxToken.expiry))
  return {
    key: name.filter(x => x !== undefined).join(':'),
    value: cxToken.value
  }
}

export function bytes32ToString(bytes32Str: string): string {
  try {
    return parseBytes32String(bytes32Str)
  } catch (error) {
    console.error(error)
  }
  return ''
}
