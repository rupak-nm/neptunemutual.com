import { addClarityAnalytics } from './clarity'
import { addGoogleAnalytics } from './google-analytics'

function addAnalytics () {
  addClarityAnalytics()
  addGoogleAnalytics()
}

export { addAnalytics }
