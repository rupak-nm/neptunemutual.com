import { appendTableRows, toggleElementVisibility, updateInnerHtml } from './dom'
import { getGithubFile } from './utils/check-github-file'
import { fetchGithubAdvisory } from './utils/fetch-github-advisory'
import { getWeeklyDownloads } from './utils/get-version-downloads'
import { getYarnPackagesWithFinalVersion } from './utils/get-yarn-packages'
import { parsePackageJson } from './utils/parse-package-json'
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

    filesEl.forEach(fileEl => {
      const fileName = fileEl.getAttribute('data-name')

      // hide files based on the available files
      toggleElementVisibility({
        element: fileEl,
        show: availableFiles.find(_file => _file.name === fileName)
      })
    })

    // show 'No files found' element if no available files
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: ".found.files > *[data-name='no-files']",
      show: availableFiles.length === 0
    })

    // show status complete element if no available files
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='complete']",
      show: availableFiles.length === 0
    })

    // show status in-progress element if files are available
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: "div.status > div[data-status='in-progress']",
      show: availableFiles.length
    })

    // @note: @todo
    if (fileType === 'package-lock.json') return

    const file = availableFiles.find(f => f.name === fileType)
    if (file) {
      handleFileAnalysis(fileType, file)
    }
  }

  async function handleFileAnalysis (fileType, file) {
    const packagesFn = fileType === 'yarn.lock' ? getYarnPackagesWithFinalVersion : parsePackageJson
    const packages = await packagesFn(file.download_url)

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
      potentialIssuePackages = await getWeeklyDownloads(packages)
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
