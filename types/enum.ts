enum Api {
  Audit = 'audits',
  Blog = 'blog',
  Contract = 'contracts',
  ContractArbitrum = 'contracts.arbitrum',
  ContractFuji = 'contracts.fuji',
  ContractBaseGoerli = 'contracts.base-goerli',
  Ecosystem = 'ecosystems',
  Doc = 'docs',
  Media = 'media',
  News = 'news',
  Policy = 'pages',
  Pressroom = 'pressroom',
  Program = 'programs',
  Roadmap = 'roadmap',
  Vacancy = 'vacancies',
  Video = 'videos',
  Hack = 'hacks'
}

type BlogOrPressroom = Api.Blog | Api.Pressroom

enum Network {
  Ethereum = 1,
  Arbitrum = 42161,
  Fuji = 43113,
  BaseGoerli = 84531
}

export { Api, BlogOrPressroom, Network }
