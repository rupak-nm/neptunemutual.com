import { getContractData } from '../../../util/protocol'

{
  const container = document.querySelector('.contract.details.container')
  const input = document.querySelector('.contract.details .search.input input')
  const resultSections = document.querySelectorAll('.contract.details .result.item[data-show][data-index]')

  const filterButtons = document.querySelectorAll('.cxToken.contract.filter.tabs button')

  const dataset = container.dataset
  const networkId = dataset.network || '1'
  const type = dataset.type || 'contracts'

  const getContracts = async (networkId = 1, type = 'contracts') => {
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

  const filterItems = (query = '', filterBy = 'active') => {
    const filteredIndexes = contracts.reduce((prev, curr, index) => {
      const _name = curr.name.toLowerCase()
      const _address = curr.address.toLowerCase()
      if (
        (
          _name.includes(query) ||
          _address.includes(query)
        ) &&
        (
          (filterBy === 'active' && !curr.expired) ||
          (filterBy === 'expired' && curr.expired)
        )
      ) prev.push(index)
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

    const filteredIndexesByQuery = contracts.reduce((prev, curr, index) => {
      const _name = curr.name.toLowerCase()
      const _address = curr.address.toLowerCase()
      if (
        _name.includes(query) ||
        _address.includes(query)
      ) prev.push(index)
      return prev
    }, [])

    const activeCount = contracts
      .filter(({ expired }, index) => filteredIndexesByQuery.includes(index) && !expired)
      .length
    const expiredCount = contracts
      .filter(({ expired }, index) => filteredIndexesByQuery.includes(index) && expired)
      .length

    filterButtons.forEach(filterButton => {
      const buttonFilter = filterButton.getAttribute('data-filter')
      filterButton.setAttribute('data-active', buttonFilter === filterBy ? 'true' : 'false')

      const badgeElement = filterButton.querySelector('span.badge')
      if (buttonFilter === 'active') badgeElement.textContent = activeCount
      if (buttonFilter === 'expired') badgeElement.textContent = expiredCount
    })

    container.setAttribute('data-filter', filterBy)
  }

  const _contracts = await getContracts(networkId, type)
  const { data: contracts } = getContractData(_contracts, type)

  input.addEventListener('input', async (e) => {
    const searchValue = e.target?.value?.toLowerCase()
    const filter = container.dataset.filter

    filterItems(searchValue, filter)
  })

  filterButtons.forEach(filterButton => {
    filterButton.addEventListener('click', e => {
      const buttonFilter = e.currentTarget.getAttribute('data-filter')
      const inputValue = input.value

      filterItems(inputValue, buttonFilter)
    })
  })

  filterItems()
}
