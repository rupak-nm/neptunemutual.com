import * as feeds from './feeds/index'
import * as sitemap from './sitemap'

const tasks: Array<() => Promise<void>> = [sitemap.generate, feeds.generate]

export { tasks }
