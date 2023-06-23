interface NetworkOption {
  name: string
  src: any
  srcDark: any
  text: string
  link: string
}

const networks: NetworkOption[] = [
  {
    name: 'Ethereum',
    src: import(
      '../../elements/icons/custom/Brands/default/SvgEthereum.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../../elements/icons/custom/Brands/dark/SvgEthereumDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'ethereum.neptunemutual.net',
    link: 'https://ethereum.neptunemutual.net'
  },
  {
    name: 'Arbitrum',
    src: import(
      '../../elements/icons/custom/Brands/default/SvgArbitrum.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../../elements/icons/custom/Brands/dark/SvgArbitrumDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'arbitrum.neptunemutual.net',
    link: 'https://arbitrum.neptunemutual.net'
  },
  {
    name: 'BNB Smart Chain',
    src: import(
      '../../elements/icons/custom/Brands/default/SvgBNBChain.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../../elements/icons/custom/Brands/dark/SvgBNBChainDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'bsc.neptunemutual.net',
    link: 'https://bsc.neptunemutual.net'
  }
]

export { networks }
