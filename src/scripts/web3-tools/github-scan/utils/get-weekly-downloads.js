const BASE_URL = 'https://api.npmjs.org/versions/:packageName/last-week'

function potentialFlag (downloadCount) {
  if (downloadCount < 50_000) return true
  return false
}

function getVulenrableByDownloads (statsArray, packages) {
  const vulnerablePackages = []
  packages.map(p => {
    const name = p.name
    const versions = p.versions
    const npmStats = statsArray.find(res => res.package === name)
    versions.map(v => {
      const downloadcount = npmStats.downloads[v]
      const flag = potentialFlag(downloadcount)
      if (flag) vulnerablePackages.push(name)
      return null
    })
    return null
  })

  return vulnerablePackages
}

async function getVulnerableByWeeklyDownloads (packages) {
  try {
    const requests = []
    packages.map(p => {
      const url = BASE_URL.replaceAll(':packageName', encodeURIComponent(p.name))
      requests.push(fetch(url, {
        // headers: { 'Content-Type': 'application/json' }
      }))
      return null
    })
    const responses = await Promise.all(requests)

    const jsonResponses = await Promise.all(responses.map(res => res.json()))

    return getVulenrableByDownloads(jsonResponses, packages)
  } catch (e) {
    console.error('Error in getting weeekly downloads: ', e)
  }

  return []
}

export { getVulnerableByWeeklyDownloads }
