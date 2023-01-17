import { addClarityAnalytics } from './clarity'
import { addGoogleAnalytics } from './google-analytics'

function addAnalytics () {
  addGoogleAnalytics()
  addClarityAnalytics()
}

export { addAnalytics }
