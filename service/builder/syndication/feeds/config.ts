import { Api } from '../../../../types/enum'

const config = {
  allowed: [Api.Blog, Api.Pressroom],
  root: 'public/feeds'
}

export { config }
