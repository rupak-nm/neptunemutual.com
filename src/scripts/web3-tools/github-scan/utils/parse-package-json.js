const fetchPackageJson = async (downloadUrl) => {
  try {
    const res = await fetch(downloadUrl)
    const data = await res.json()
    return data
  } catch (e) {
    console.log('error: ', e)
  }

  return {}
}

const getSimplifiedVersion = versionString => {
  return versionString.replaceAll(/[^\d.]/g, '')
}

const parsePackageJson = async (downloadUrl) => {
  const data = await fetchPackageJson(downloadUrl)

  const packages = []
  if (Object.keys(data).length) {
    const dependencies = data.dependencies
    const devDependencies = data.devDependencies

    if (dependencies) {
      Object.keys(dependencies).map(key => {
        packages.push({ name: key, versions: [getSimplifiedVersion(data.dependencies[key])] })
        return null
      })
    }

    if (devDependencies) {
      Object.keys(devDependencies).map(key => {
        packages.push({ name: key, versions: [getSimplifiedVersion(data.devDependencies[key])] })
        return null
      })
    }
  }

  return packages
}

export { parsePackageJson }
