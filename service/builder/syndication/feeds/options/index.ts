import { type FeedOptions } from 'feed'

import blog from './blog.json'
import pressroom from './pressroom.json'

const get = (type: string, updated: Date): FeedOptions => {
  const copyright = `All rights reserved ${new Date().getFullYear()}, Neptune Mutual`

  if (type === 'blog') {
    return { ...blog, copyright, updated }
  }

  return { ...pressroom, copyright, updated }
}

export { get }
