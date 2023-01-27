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

export const getTabs = (networkId: number, type: string): TabProp[] => {
  const networkSlugs: Record<number, string> = {
    [Networks.Ethereum]: 'ethereum',
    [Networks.Arbitrum]: 'arbitrum',
    [Networks.Fuji]: 'fuji'

  }

  return [
    {
      text: 'Contracts',
      href: `/protocol/${networkSlugs[networkId]}/contracts`,
      active: type === 'contracts'
    },
    {
      text: 'cxTokens',
      href: `/protocol/${networkSlugs[networkId]}/cx-tokens`,
      active: type === 'cxTokens'
    },
    {
      text: 'PODs',
      href: `/protocol/${networkSlugs[networkId]}/pods`,
      active: type === 'pods'
    }
  ]
}
