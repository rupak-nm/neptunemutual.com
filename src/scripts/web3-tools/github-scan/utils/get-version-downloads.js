const BASE_URL = 'https://api.npmjs.org/versions/:packageName/last-week'

async function potentialFlag (downloadCount) {
  if (downloadCount < 50_000) return true
  return false
}

function getVulenrableByDownloads (statsArray, packages) {
  const vulnerablePackages = []
  packages.map(p => {
    const name = p.name
    const versions = p.versions
    const npmStats = statsArray.find(res => res.package === name)
    const flags = versions.filter(v => potentialFlag(npmStats.downloads[v]))
    if (flags.length) vulnerablePackages.push(name)
    return null
  })

  return vulnerablePackages
}

async function getWeeklyDownloads (packages) {
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

export { getWeeklyDownloads }
