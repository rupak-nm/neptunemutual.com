const BASE_URL = 'https://registry.npmjs.org/:packageName'

const isOlderThanSixMonths = (dateString) => {
  return (
    (
      (Date.now() - new Date(dateString).getTime()) /
      (1000 * 60 * 60 * 24 * 30)
    ) > 6
  )
}

function getVulenrableByDate (dataArray, packages) {
  const vulnerablePackages = []
  packages.map(p => {
    const name = p.name
    const versions = p.versions
    const stats = dataArray.find(res => res._id === name)
    versions.map(v => {
      const date = stats.time[v]
      const flag = !isOlderThanSixMonths(date)
      if (flag) vulnerablePackages.push(name)
      return null
    })
    return null
  })

  return vulnerablePackages
}

async function getVulnerableByPublishedDate (packages) {
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

    return getVulenrableByDate(jsonResponses, packages)
  } catch (e) {
    console.error('Error in getting weeekly downloads: ', e)
  }

  return []
}

export { getVulnerableByPublishedDate }
