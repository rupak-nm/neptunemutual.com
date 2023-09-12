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
      '../elements/icons/custom/Brands/default/SvgEthereum.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../elements/icons/custom/Brands/dark/SvgEthereumDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'ethereum.neptunemutual.net',
    link: 'https://ethereum.neptunemutual.net'
  },
  {
    name: 'Arbitrum',
    src: import(
      '../elements/icons/custom/Brands/default/SvgArbitrum.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../elements/icons/custom/Brands/dark/SvgArbitrumDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'arbitrum.neptunemutual.net',
    link: 'https://arbitrum.neptunemutual.net'
  },
  {
    name: 'BNB Smart Chain',
    src: import(
      '../elements/icons/custom/Brands/default/SvgBNBChain.svg?raw'
    ).then((x: any) => x.default),
    srcDark: import(
      '../elements/icons/custom/Brands/dark/SvgBNBChainDark.svg?raw'
    ).then((x: any) => x.default),
    text: 'bsc.neptunemutual.net',
    link: 'https://bsc.neptunemutual.net'
  }
]

const tokens = {
  eth: {
    npm: '0x57f12FE6A4e5fe819eec699FAdf9Db2D06606bB4',
    usdc: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48'
  },
  arb: {
    npm: '0x57f12FE6A4e5fe819eec699FAdf9Db2D06606bB4',
    usdc: '0xff970a61a04b1ca14834a43f5de4533ebddb5cc8'
  }
}

const swaps: Array<{
  src: any
  srcDark: any
  title: string
  href: string
}> = [
  {
    src: import('../elements/icons/custom/sushi-arb.svg?raw').then((x: any) => x.default),
    srcDark: import('../elements/icons/custom/sushi-arb-dark.svg?raw').then((x: any) => x.default),
    title: 'Sushiswap (Arbitrum)',
    href: `https://www.sushi.com/swap?token0=${tokens.arb.usdc}&token1=${tokens.arb.npm}&chainId=42161`
  },
  {
    src: import('../elements/icons/custom/uniswap-eth.svg?raw').then((x: any) => x.default),
    srcDark: import('../elements/icons/custom/uniswap-eth-dark.svg?raw').then((x: any) => x.default),
    title: 'Uniswap (Ethereum)',
    href: `https://app.uniswap.org/#/swap?inputCurrency=USDC&outputCurrency=${tokens.eth.npm}&chain=mainnet`
  }
]

export { networks, swaps }
