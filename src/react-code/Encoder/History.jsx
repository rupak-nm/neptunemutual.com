import './History.scss'

import { Fragment, useEffect, useState } from 'react'

import { Icon } from '../components/Icon'
import { chains } from './helpers/wallet/chains'
import { CustomCheckbox } from '../components/Checkbox/Checkbox'
import { createContractKey } from '../../../util/string'
import { set } from 'idb-keyval'

const STORAGE_KEY = 'abis'

const History = ({
  contracts,
  setContracts,
  download,
  restore,
  restorationFailed,
  restoreSpecificCallback,
  handleNew,
  currentSelected,
  setCurrentSelected,
  selected,
  setSelected
}) => {
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setSelected([])
  }, [contracts?.length])

  const restoreSpecificContract = (e) => {
    const { key } = e.currentTarget.dataset
    restoreSpecificCallback(key)

    if (currentSelected === Number(key)) {
      setCurrentSelected(null)
      handleNew()
      return
    }

    setCurrentSelected(Number(key))
  }

  const handleSelect = (e) => {
    e.stopPropagation()
    const { key } = e.target.dataset
    const cKeys = [...selected]

    const index = cKeys.indexOf(Number(key))
    index === -1 ? cKeys.push(Number(key)) : cKeys.splice(index, 1)

    setSelected(cKeys)
  }

  const deleteContracts = () => {
    const _selected = [...selected]
    const leftOverContracts = contracts.filter((_, i) => !_selected.includes(i))
    setContracts(leftOverContracts)

    setCurrentSelected(null)
    handleNew()

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leftOverContracts))
  }

  const duplicateContracts = () => {
    const duplicates = []

    selected.forEach((key) => {
      const contract = { ...contracts[key] }
      const duplicateContract = { ...contract, contract_name: `${contract.contract_name} - Copy`, showDetails: false }
      const duplicateKey = createContractKey(
        duplicateContract.contract_name,
        duplicateContract.address,
        duplicateContract.network
      )

      duplicates.unshift({ ...duplicateContract, key: duplicateKey })
    })

    setContracts([...duplicates, ...contracts])
    setCurrentSelected(null)
    handleNew()

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify([...duplicates, ...contracts]))
  }

  const handleSelectAll = (e) => {
    const keysForDeletions = []

    contracts.map((contract, i) => {
      if (e.target.checked) {
        keysForDeletions.push(i)
      }

      return { ...contract, isSelected: e.target.checked }
    })

    setSelected(keysForDeletions)
  }

  const toggleItemDetails = (key) => {
    const _contracts = [...contracts]

    _contracts[key].showDetails = !(_contracts[key]?.showDetails || false)
    setContracts(_contracts)
  }

  useEffect(() => {
    // close dropdown when clicked outside of div.cta
    const closeDropdown = (e) => {
      if (!e.target.closest('.cta')) {
        setShowDropdown(false)
      }
    }

    document.addEventListener('click', closeDropdown)

    return () => {
      document.removeEventListener('click', closeDropdown)
    }
  }, [])

  const CtaDropdown = () => {
    return (
      <div className='cta'>
        <button className='dots trigger' onClick={() => setShowDropdown(!showDropdown)}>
          <Icon variant='dots-vertical' />
        </button>

        {
          showDropdown && (
            <div className='dropdown'>
              <button onClick={download}>
                <span>Download Backup</span>
                <Icon variant='download-02' />
              </button>

              <button onClick={restore}>
                <span>Restore</span>
                <Icon variant='clock-rewind' />
              </button>
            </div>
          )
        }
      </div>
    )
  }

  return (
    <div className='history container'>
      <div className='title'>
        <div className='history title'>Previous Contracts</div>
          <button
            className='new'
            onClick={() => {
              setCurrentSelected(null)
              setSelected([])
              handleNew()
            }}
            data-tooltip='Add new contract'
            data-flow="left"
          >
            <Icon variant='plus' size='md' />
          </button>
      </div>

      <div className='action section'>
        {
          contracts.length > 0 && (
            <>
              <CustomCheckbox
                onChange={handleSelectAll}
                checked={selected.length === contracts.length}
                data-variant='minus'
              />

              <div className='buttons'>
                {selected.length > 0 && (
                  <>
                    <button
                      className="duplicate btn"
                      onClick={duplicateContracts}
                      data-tooltip='Duplicate selected contracts'
                    >
                      <Icon variant='file-plus' />
                    </button>

                    <button
                      className="delete btn"
                      onClick={deleteContracts}
                      data-tooltip='Delete selected contracts'
                    >
                      <Icon variant='trash-01' />
                    </button>
                  </>
                )}

                <CtaDropdown />
              </div>
            </>
          )
        }
      </div>

      <div className='history list'>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <Fragment key={`contract-${i}`}>
              <div className={`item wrapper ${currentSelected === i ? 'selected' : ''}`}>
                <div className='item title'>
                  <CustomCheckbox
                    checked={selected.includes(i)}
                    onChange={handleSelect}
                    data-key={i}
                  />

                  <button
                    className='item'
                    data-key={i}
                    onClick={restoreSpecificContract}
                  >
                    <span>{contract.contract_name || 'Untitled'}</span>
                    {/* {contract.network && <span>[{contract.network}]</span>} */}
                  </button>

                  <button className='toggle' onClick={() => toggleItemDetails(i)}>
                    <Icon variant={contract.showDetails ? 'chevron-up' : 'chevron-down'} size='sm' />
                  </button>
                </div>
                {
                  contract.showDetails && (
                    <div className='item details'>
                      <p>
                        <span>Address: </span>{contract.address || <i>No address provided</i>}</p>
                      {contract.network
                        ? (
                          <p>
                            <span>Network: </span>{chains[contract.network]?.name || 'Unknown Network'}{' '}({contract.network})
                          </p>
                          )
                        : <i>No network provided</i>}
                    </div>
                  )
                }

              </div>

              {i < contracts.length - 1 && <hr />}
            </Fragment>
          )
        })}
      </div>
      {restorationFailed && <div className='error'>Restoration failed invalid format.</div>}
    </div>
  )
}

export { History }
