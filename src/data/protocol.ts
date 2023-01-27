import { Network } from '../../types/enum'

const getToc = (networkId: number): TableOfContentsProp => {
  return {
    items: [
      {
        text: 'Main Ethereum Network',
        icon: 'ethereum-round',
        type: 0,
        href: '/protocol/ethereum/contracts',
        active: networkId === Network.Ethereum
      },
      {
        text: 'Arbitrum One',
        icon: 'arbitrum-round',
        type: 0,
        href: '/protocol/arbitrum/contracts',
        active: networkId === Network.Arbitrum
      },
      {
        text: 'Avalanche C-Chain Testnet (Fuji)',
        icon: 'avalanche',
        type: 0,
        href: '/protocol/fuji/contracts',
        active: networkId === Network.Fuji
      }
    ]
  }
}

const getTabs = (networkId: number, type: string): TabProp[] => {
  const networkSlugs: Record<number, string> = {
    [Network.Ethereum]: 'ethereum',
    [Network.Arbitrum]: 'arbitrum',
    [Network.Fuji]: 'fuji'

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

const config: NetworkConfig = {
  [Network.Ethereum]: {
    id: Network.Ethereum,
    title: 'Neptune Mutual on Ethereum',
    app: 'https://ethereum.neptunemutual.net',
    explorer: 'https://etherscan.io/address/'
  },
  [Network.Arbitrum]: {
    id: Network.Arbitrum,
    title: 'Neptune Mutual on Arbitrum',
    app: 'https://arbitrum.neptunemutual.net',
    explorer: 'https://arbiscan.io/address/'
  },
  [Network.Fuji]: {
    id: Network.Fuji,
    title: 'Neptune Mutual on Fuji (Testnet)',
    app: 'https://test.neptunemutual.net',
    explorer: 'https://testnet.snowtrace.io/address/'
  }
}

interface LabelsType {
  [key: string]: string
}

const Labels: LabelsType = {
  contracts: 'Protocol Contracts & Tokens',
  cxTokens: 'cxTokens',
  pods: 'PODs (Vault Contracts)',
  fdf: '3232'
}

export { config, getTabs, getToc, Labels }
