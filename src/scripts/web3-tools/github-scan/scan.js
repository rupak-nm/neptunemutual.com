import { appendTableRows, toggleElementVisibility, updateInnerHtml } from './dom'
import { getGithubFile } from './utils/check-github-file'
import { fetchGithubAdvisory } from './utils/fetch-github-advisory'
import { getVulnerableByPublishedDate } from './utils/get-published-data'
import { getVulnerableByWeeklyDownloads } from './utils/get-weekly-downloads'
import { getYarnPackagesWithFinalVersion } from './utils/get-yarn-packages'
import { parsePackageJson } from './utils/parse-package-json'
import { parsePackageLock } from './utils/parse-package-lock'
import { checkRepository } from './utils/validate-github'

{
  const mainContainer = document.querySelector('.container.github.scan') ?? document

  const orgNameEl = mainContainer.querySelector('#OrganizationName')
  const repoNameEl = mainContainer.querySelector('#RepoName')
  const accessTokenEl = mainContainer.querySelector('#AccessToken')
  const fileTypesEl = mainContainer.querySelector('fieldset#FileType')

  const initiateButton = mainContainer.querySelector('button.initiate')

  const summaryContainerEl = mainContainer.querySelector('.summary.container')

  const inputElements = [
    { name: 'orgName', el: orgNameEl },
    { name: 'repoName', el: repoNameEl },
    { name: 'accessToken', el: accessTokenEl }
  ]

  const values = {
    orgName: '',
    repoName: '',
    accessToken: '',
    fileType: ''
  }

  inputElements.forEach(({ name, el }) => {
    el.addEventListener('input', e => {
      values[name] = e.target.value
      updateButton()
    })
  })

  fileTypesEl.addEventListener('change', e => {
    values.fileType = e.target.value
    updateButton()
  })

  function updateButton () {
    if (!values.orgName || !values.repoName || !values.accessToken || !values.fileType) initiateButton.setAttribute('disabled', 'true')
    else initiateButton.removeAttribute('disabled')
  }

  initiateButton.addEventListener('click', () => {
    handleInitiateScan()
  })

  function resetUI () {
    // show summary container
    toggleElementVisibility({
      element: summaryContainerEl,
      show: false
    })

    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      newHtml: ''
    })

    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'table > tbody',
      newHtml: ''
    })

    // show vulnerable packages badge if needed
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: 'table > thead span.badge',
      show: true
    })

    // update package count number
    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'table > thead span.badge',
      newHtml: ''
    })
  }

  async function handleInitiateScan () {
    resetUI()

    const { orgName, repoName, accessToken } = values

    const { org, repo } = await checkRepository(orgName, repoName, accessToken)

    // show organization input error if org.exists is false
    toggleElementVisibility({
      parent: mainContainer,
      selector: 'span[data-name="org"].input.error',
      show: !org.exists,
      hideClass: ['hide']
    })

    // show repo input error repo.exists is false
    toggleElementVisibility({
      parent: mainContainer,
      selector: 'span[data-name="repo"].input.error',
      show: !repo.exists,
      hideClass: ['hide']
    })

    if (org.exists && repo.exists) {
      handleSummary()
    }
  }

  async function handleSummary () {
    // show summary container
    toggleElementVisibility({
      element: summaryContainerEl,
      show: true
    })

    const { orgName, repoName, accessToken, fileType } = values

    const availableFiles = await getGithubFile(orgName, repoName, accessToken)

    const filesEl = summaryContainerEl.querySelectorAll('.found.files > .file')

    // show files container if availables files are available
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: '.header > .found.files',
      show: availableFiles.length
    })

    filesEl.forEach(fileEl => {
      const fileName = fileEl.getAttribute('data-name')

      // hide files based on the available files
      toggleElementVisibility({
        element: fileEl,
        show: availableFiles.find(_file => _file.name === fileName)
      })
    })

    const selectedFile = availableFiles.find(f => f.name === fileType)

    // show 'No files found' element if no available files
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: ".header > *[data-name='no-files']",
      show: !availableFiles.length
    })

    // show 'Couldn't find selected file' element if selected file not found
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: ".header > *[data-name='no-selected-file']",
      show: !selectedFile
    })

    // show status complete element if no available files
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='complete']",
      show: !availableFiles.length || !selectedFile
    })

    // show status in-progress element if files are available
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='in-progress']",
      show: availableFiles.length && selectedFile
    })

    let getFullPackages = null
    if (fileType === 'package.json') {
      const yarnFile = availableFiles.find(f => (f.name === 'yarn.lock'))
      const packageLockFile = availableFiles.find(f => (f.name === 'package-lock.json'))
      if (yarnFile) getFullPackages = () => getYarnPackagesWithFinalVersion(yarnFile.download_url)
      else if (packageLockFile) getFullPackages = () => parsePackageLock(packageLockFile.download_url)
    }

    if (selectedFile) {
      handleFileAnalysis(fileType, selectedFile, getFullPackages)
    }
  }

  const packageFn = {
    'yarn.lock': getYarnPackagesWithFinalVersion,
    'package.json': parsePackageJson,
    'package-lock.json': parsePackageLock
  }

  async function handleFileAnalysis (fileType, file, getFullPackages) {
    const packages = await packageFn[fileType](file.download_url, getFullPackages)

    // show package count when packages are available
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      show: packages.length
    })

    // update package count number
    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      newHtml: `0 of ${packages.length} packages`
    })

    const vulnerablePackages = await fetchGithubAdvisory(packages, values.accessToken)

    let potentialIssuePackages = []
    if (fileType === 'package.json') {
      const potentialByDownloads = await getVulnerableByWeeklyDownloads(packages)
      const potentialByDate = await getVulnerableByPublishedDate(packages)
      potentialIssuePackages = [...new Set(potentialByDownloads), ...new Set(potentialByDate)]
    }

    const flattenedData = []
    for (let i = 0; (i < vulnerablePackages.length) || (i < potentialIssuePackages.length); i++) {
      const item1 = vulnerablePackages[i]
      const item2 = potentialIssuePackages[i] ?? ''

      const name = item1 ? Object.keys(item1)[0] : ''
      const issueCount = item1 ? item1[name].length : ''

      flattenedData.push({
        name,
        issueCount,
        unstable: item2
      })
    }

    // update package count number
    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      newHtml: `${packages.length} of ${packages.length} packages`
    })

    // hide status in-progress once the scanning is complete
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='in-progress']",
      show: false
    })

    // show status complete once the scanning is complete
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='complete']",
      show: true
    })

    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: 'table',
      show: true
    })

    if (vulnerablePackages.length) {
      // show vulnerable packages badge if needed
      toggleElementVisibility({
        parent: summaryContainerEl,
        selector: 'table > thead span.badge.success',
        show: true
      })

      // update package count number
      updateInnerHtml({
        parent: summaryContainerEl,
        selector: 'table > thead span.badge.success',
        newHtml: vulnerablePackages.length
      })
    }

    if (potentialIssuePackages.length) {
      // show vulnerable packages badge if needed
      toggleElementVisibility({
        parent: summaryContainerEl,
        selector: 'table > thead span.badge.danger',
        show: true
      })

      // update package count number
      updateInnerHtml({
        parent: summaryContainerEl,
        selector: 'table > thead span.badge.danger',
        newHtml: potentialIssuePackages.length
      })
    }

    appendTableRows({
      parent: summaryContainerEl,
      tableBodySelector: 'table > tbody',
      rowData: flattenedData
    })
  }
}
