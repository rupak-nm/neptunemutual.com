import { getContractData } from '../../../util/protocol'

{
  const getContracts = async (networkId, type) => {
    const urls = {
      1: '/cache/contracts.json',
      42161: '/cache/contracts.arbitrum.json',
      43113: '/cache/contracts.fuji.json'
    }
    const url = urls[networkId]

    try {
      const res = await fetch(url)
      const { data } = await res.json()

      return data ? data[type] : []
    } catch (error) {
      console.error(error)
    }

    return []
  }

  const input = document.querySelector('.contract.details .search.input input')
  const resultSections = document.querySelectorAll('.contract.details .result.item[data-show][data-index]')

  const dataset = document.querySelector('.contract.details.container').dataset
  const networkId = dataset.network
  const type = dataset.type

  let contracts = []

  input.addEventListener('input', async (e) => {
    const searchValue = e.target?.value?.toLowerCase() || ''

    if (!contracts.length) {
      const _contracts = await getContracts(networkId, type)
      contracts = getContractData(_contracts, type)
    }

    const filteredIndexes = contracts.reduce((prev, curr, index) => {
      const _name = curr.name.toLowerCase()
      const _address = curr.address.toLowerCase()
      if (_name.includes(searchValue) || _address.includes(searchValue)) prev.push(index)
      return prev
    }, [])

    resultSections.forEach(resultSection => {
      const resultIndex = parseInt(resultSection.getAttribute('data-index'))

      if (filteredIndexes.includes(resultIndex)) {
        resultSection.setAttribute('data-show', 'true')
        return
      }

      resultSection.setAttribute('data-show', 'false')
    })
  })
}
