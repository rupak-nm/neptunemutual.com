import { Networks } from '../../../util/protocol'

export const getToc = (networkId: number): TableOfContentsProp => {
  return {
    items: [
      {
        text: 'Main Ethereum Network',
        icon: 'ethereum-round',
        type: 0,
        href: '/protocol/ethereum/contracts',
        active: networkId === Networks.Ethereum
      },
      {
        text: 'Arbitrum One',
        icon: 'arbitrum-round',
        type: 0,
        href: '/protocol/arbitrum/contracts',
        active: networkId === Networks.Arbitrum
      },
      {
        text: 'Avalanche C-Chain Testnet (Fuji)',
        icon: 'avalanche',
        type: 0,
        href: '/protocol/fuji/contracts',
        active: networkId === Networks.Fuji
      }
    ]
  }
}

export const getTabs = (type: string): TabProp[] => {
  return [
    {
      text: 'Contracts',
      href: '/contracts',
      active: type === 'contracts'
    },
    {
      text: 'cxTokens',
      href: '/cxtokens',
      active: type === 'cxTokens'
    },
    {
      text: 'PODs',
      href: '/pods',
      active: type === 'pods'
    }
  ]
}
