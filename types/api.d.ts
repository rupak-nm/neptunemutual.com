interface Meta {
  title: string
  description: string
  image?: Media
}

declare enum DocumentStatus {
  Draft = 'draft',
  Published = 'published'
}

declare enum VideoType {
  Youtube = 'youtube',
  Vimeo = 'vimeo'
}

declare enum EcosystemType {
  CoverCreators = 'cover-creators',
  LiquidityProviders = 'liquidity-providers',
  Policyholders = 'policyholders'
}

// ---------------------------------------------------------------------------------------------

interface Media {
  id: string
  alt: string
  filename: string
  mimeType: string
  filesize: number
  url: string
  width: number
  height: number
  createdAt: Date
  updatedAt: Date
}

interface Tag {
  id: string
  name?: string
  text?: string
  outline?: boolean
  slug: string
  color: string
  meta?: Meta
  createdAt?: Date
  updatedAt?: Date
}

interface TagWithHref extends Tag {
  href?: string
  icon?: string
  size?: '2xl' | 'xl' | 'lg' | 'md' | 'sm'
}

interface Content {
  id: string
  title: string
  intro: string
  slug?: string
  href?: string
  cover?: Media
  tags?: Tag[]
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Roadmap extends Content {
  id: string
  title: string
  slug: string
  current: boolean
  sort: number
  content: []
  contentHtml: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Article extends Content {
  id: string
  title: string
  slug?: string
  intro: string
  cover: Media
  content: any[]
  contentHtml: string
  featured?: true
  tags?: Tag[]
  meta: Meta
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface NewsItem extends Content {
  id: string
  press: MediaHouse
  title: string
  cover: Media
  link: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Page extends Content {
  id: string
  category: string
  sort: number
  title: string
  slug: string
  content: any[]
  contentHtml?: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  meta: Meta
}

interface Program {
  id: string
  category: string
  intro: string
  title: string
  slug: string
  icon: string
  badges: string
  content: any[]
  contentHtml?: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
  meta: Meta
}

interface Video {
  id: string
  type: VideoType
  title: string
  slug: string
  category: string
  videoId: string
  sort: number
  length: number
  thumbnail: Media
  description: any[]
  descriptionHtml: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Partner {
  id: string
  name: string
  slug: string
  icon: Media
  logo: Media
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Audit {
  id: string
  title: string
  slug: string
  partner: Partner
  intro: string
  badges: string
  startDate: string
  endDate: string
  report: Media
  description: any[]
  descriptionHtml: string
  meta: Meta
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface MediaHouse {
  id: string
  name: string
  badge: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Ecosystem {
  id: string
  type: EcosystemType
  content: string
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}

interface Vacancy extends Content {
  id: string
  title: string
  slug: string
  intro: string
  type: string
  location: string
  department: string
  badges: string
  form: string
  description: any[]
  descriptionHtml: string
  meta: Meta
  _status: DocumentStatus
  createdAt?: Date
  updatedAt?: Date
  publishedAt?: Date
}
