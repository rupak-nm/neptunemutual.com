import { appendTableRows, toggleElementVisibility, updateInnerHtml } from './dom'
import { getGithubFile } from './utils/check-github-file'
import { fetchGithubAdvisory } from './utils/fetch-github-advisory'
import { getYarnPackagesWithFinalVersion } from './utils/get-yarn-packages'
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

  async function handleInitiateScan () {
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

    if (fileType === 'yarn.lock' && availableFiles.find(_file => _file.name === 'yarn.lock')) {
      await handleYarnLockAnalysis(availableFiles)
    }
  }

  async function handleYarnLockAnalysis (availableFiles = []) {
    const file = availableFiles.find(_file => _file.name === 'yarn.lock')
    const packagesArray = await getYarnPackagesWithFinalVersion(file.download_url)

    // show package count when packages are available
    toggleElementVisibility({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      show: packagesArray.length
    })

    // update package count number
    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      newHtml: `0 of ${packagesArray.length} packages`
    })

    const vulnerablePackages = await fetchGithubAdvisory(packagesArray, values.accessToken)
    const flattenedData = vulnerablePackages.map(p => {
      const name = Object.keys(p)[0]
      return {
        name,
        issueCount: p[name].length,
        unstable: '1.0'
      }
    })

    // update package count number
    updateInnerHtml({
      parent: summaryContainerEl,
      selector: 'p.packages.count',
      newHtml: `${packagesArray.length} of ${packagesArray.length} packages`
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

    appendTableRows({
      parent: summaryContainerEl,
      tableBodySelector: 'table > tbody',
      rowData: flattenedData
    })
  }
}
