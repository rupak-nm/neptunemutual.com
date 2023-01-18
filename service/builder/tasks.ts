import * as cache from './cache'
import * as media from './media/cache'
import * as syndication from './syndication/index'

const tasks: TaskWithDefinition[] = [
  ['Caching API Result', cache.start],
  ['Downloading Media and Generating Syndication', media.sync, syndication.generate]
]

export { tasks }
