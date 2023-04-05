import { Network } from '../../types/enum'

const getVerticalTabItems = (networkId: number): TabItem[] => {
  return [
    {
      text: 'Main Ethereum Network',
      icon: 'ethereum-round',
      href: '/protocol/ethereum/contracts',
      active: networkId === Network.Ethereum
    },
    {
      text: 'Arbitrum One',
      icon: 'arbitrum-round',
      href: '/protocol/arbitrum/contracts',
      active: networkId === Network.Arbitrum
    },
    {
      text: 'Avalanche C-Chain Testnet (Fuji)',
      icon: 'avalanche',
      href: '/protocol/fuji/contracts',
      active: networkId === Network.Fuji
    },
    {
      text: 'Base Goerlli',
      icon: 'avalanche',
      href: '/protocol/base-goerli/contracts',
      active: networkId === Network.BaseGoerli
    }
  ]
}

const getTabItems = (networkId: number, type: string): TabItem[] => {
  const networkSlugs: Record<number, string> = {
    [Network.Ethereum]: 'ethereum',
    [Network.Arbitrum]: 'arbitrum',
    [Network.Fuji]: 'fuji',
    [Network.BaseGoerli]: 'base-goerli'
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

const config: Record<number, NetworkConfig> = {
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
  },
  [Network.BaseGoerli]: {
    id: Network.BaseGoerli,
    title: 'Neptune Mutual on Base Goerli (Testnet)',
    app: 'https://test.neptunemutual.net',
    explorer: 'https://goerli.basescan.org/'
  }
}

const labels: Record<string, string> = {
  contracts: 'Protocol Contracts & Tokens',
  cxTokens: 'cxTokens',
  pods: 'PODs (Vault Contracts)'
}

export { config, getTabItems, getVerticalTabItems, labels }
