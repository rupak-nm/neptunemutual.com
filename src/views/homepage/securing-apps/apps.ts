interface App {
  id: string
  name: string
  src: any
}

export const apps: App[] = [
  { id: 'aave', name: 'Aave', src: import('./logo/aave.svg?raw').then((x: any) => x.default) },
  { id: 'balancer', name: 'Balancer', src: import('./logo/balancer.svg?raw').then((x: any) => x.default) },
  { id: 'gnosissafe', name: 'Gnosis Safe', src: import('./logo/gnosis-safe.svg?raw').then((x: any) => x.default) },
  { id: 'makerdao', name: 'Maker DAO', src: import('./logo/makerdao.svg?raw').then((x: any) => x.default) },
  { id: 'binance', name: 'Binance', src: import('./logo/binance.svg?raw').then((x: any) => x.default) },
  { id: 'okx', name: 'OKX', src: import('./logo/okx.svg?raw').then((x: any) => x.default) },
  { id: 'uniswap', name: 'Uniswap', src: import('./logo/uniswap.svg?raw').then((x: any) => x.default) },
  { id: 'curve', name: 'Curve', src: import('./logo/curve.svg?raw').then((x: any) => x.default) }
]
