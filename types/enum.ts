enum Api {
  Audit = 'audits',
  Blog = 'blog',
  Contract = 'contracts',
  ContractArbitrum = 'contracts.arbitrum',
  ContractFuji = 'contracts.fuji',
  Ecosystem = 'ecosystems',
  Media = 'media',
  News = 'news',
  Policy = 'pages',
  Pressroom = 'pressroom',
  Program = 'programs',
  Roadmap = 'roadmap',
  Vacancy = 'vacancies',
  Video = 'videos'
}

type BlogOrPressroom = Api.Blog | Api.Pressroom

export { Api, BlogOrPressroom }
