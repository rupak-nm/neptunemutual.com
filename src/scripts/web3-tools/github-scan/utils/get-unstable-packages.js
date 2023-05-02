import { GREATER_THAN_50K, GREATER_THAN_MILLION, NPM_DOWNLOADS_API, NPM_PUBLISHED_DATE_API } from './constants'

function potentialFlag (downloadCount) {
  if (downloadCount > 1_000_000) return { [GREATER_THAN_MILLION]: true }
  if (downloadCount > 50_000) return { [GREATER_THAN_50K]: true }
  return false
}

function getVulnerableByDownloads (statsArray, packages) {
  const vulnerablePackages = []
  packages.map(p => {
    const name = p.name
    const versions = p.versions
    const npmStats = statsArray.find(res => res.package === name)
    versions.map(v => {
      const downloadcount = npmStats.downloads[v]
      const flag = potentialFlag(downloadcount)
      if (flag) vulnerablePackages.push({ name, ...flag })
      return null
    })
    return null
  })

  return vulnerablePackages
}

const isOlderThanNMonths = (dateString, n) => {
  return (
    (
      (Date.now() - new Date(dateString).getTime()) /
      (1000 * 60 * 60 * 24 * 30)
    ) > n
  )
}

function getVulnerableByDate (dataArray, packages, vulnerableByDownloads) {
  const vulnerablePackages = []
  packages.map(p => {
    const name = p.name
    const versions = p.versions
    const stats = dataArray.find(res => res._id === name)

    const downloadStats = vulnerableByDownloads.find(p => p.name === name)
    versions.map(v => {
      const date = stats.time[v]
      if (
        !(downloadStats &&
          (
            (downloadStats[GREATER_THAN_50K] && isOlderThanNMonths(date, 6)) ||
            (downloadStats[GREATER_THAN_MILLION] && isOlderThanNMonths(date, 3))
          ))) {
        vulnerablePackages.push(name)
      }
      return null
    })
    return null
  })

  return vulnerablePackages
}

async function getUnstablePackages (packages) {
  try {
    const requests = { download: [], published: [] }
    packages.map(p => {
      const downloadUrl = NPM_DOWNLOADS_API(p.name)
      requests.download.push(fetch(downloadUrl, {
        // headers: { 'Content-Type': 'application/json' }
      }))

      const publishedUrl = NPM_PUBLISHED_DATE_API(p.name)
      requests.published.push(fetch(publishedUrl, {
        // headers: { 'Content-Type': 'application/json' }
      }))
      return null
    })

    const responses = { download: [], published: [] }

    const downloadResponses = await Promise.all(requests.download)
    responses.download = await Promise.all(downloadResponses.map(res => res.json()))

    const publishedResponses = await Promise.all(requests.published)
    responses.published = await Promise.all(publishedResponses.map(res => res.json()))

    const vulnerableByDownloads = getVulnerableByDownloads(responses.download, packages)
    const vulnerable = getVulnerableByDate(responses.published, packages, vulnerableByDownloads)

    return vulnerable
  } catch (e) {
    console.error('Error in getting weeekly downloads: ', e)
  }

  return []
}

export { getUnstablePackages }
