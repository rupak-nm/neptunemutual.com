import { rsplit } from './rsplit'

const parseText = (text) => {
  const matches = text.matchAll(/((?<=\n\n)(.*)|\s{2}version\s"(\d|\.|\^)+")/g)
  const matchesArray = Array.from(matches).map(_match => _match[0]).filter(_match => !!_match)

  const data = {}

  let lastPackageName = ''

  matchesArray.map((m, i) => {
    if (i % 2 === 0) {
      try {
        const _m = m.split(', ')[0].replaceAll('"', '').replaceAll(':', '').trim()
        lastPackageName = rsplit(_m, '@', 1)[0]
      } catch (e) { }
      return null
    }

    const replacedVersion = m.replace('version', '').replaceAll('"', '').trim()
    data[lastPackageName] = {
      versions: data[lastPackageName]
        ? [...data[lastPackageName].versions, replacedVersion]
        : [replacedVersion]
    }

    return null
  })

  return data
}

function yarnPackages (parsedYarnFile) {
  const allPackages = []
  Object.keys(parsedYarnFile).map((key) => {
    const packageName = key
    const versions = parsedYarnFile[key].versions

    allPackages.push({ name: packageName, versions })
    return null
  })
  return allPackages
}

async function getYarnPackagesWithFinalVersion (url) {
  try {
    const res = await fetch(url)
    const text = await res.text()

    const parsed = parseText(text)
    const packages = yarnPackages(parsed)

    return packages
  } catch (e) {
    console.error(e)
  }
}

export { getYarnPackagesWithFinalVersion }
