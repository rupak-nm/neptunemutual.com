import DedicatedCovers from './images/dedicated-cover-mockup.svg?raw'
import DiversifiedCovers from './images/diversified-cover-mockup.svg?raw'

const features: HomepageFeatureItem[] = [
  {
    id: 0,
    icon: 'cube-01',
    image: DedicatedCovers,
    title: 'Dedicated Covers',
    text: 'Created by projects, for their communities. These are tailor made cover policies designed to protect a specific community from security risk.'

  },
  {
    id: 1,
    icon: 'cube-02',
    image: DiversifiedCovers,
    title: 'Diversified Covers',
    text: 'Created to enable liquidity providers to diversify the risk of their capital across a portfolio of projects.  This enables the Neptune Mutual marketplace to offer cover policies to a wider variety of projects in DeFi, CeFi and Metaverse.'
  }
]

export { features }
