import React, { useState } from 'react'
import styled from 'styled-components'

import { Button } from '../components/Button'
import { Icon } from '../components/Icon'

import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { typography } from '../styles/typography'

const STORAGE_KEY = 'abis'

const History = ({ contracts, setContracts, download, restore, restorationFailed, restoreSpecificCallback }) => {
  const [forDeletion, setForDeletion] = useState([])

  const restoreSpecificContract = (e) => {
    const { key } = e.target.dataset
    const { abi, contract_name: contractName, address } = contracts[key]
    restoreSpecificCallback({ abi, contractName, address })
  }

  const selected = (e) => {
    const { key } = e.target.dataset
    const cKeys = [...forDeletion]
    const _contracts = [...contracts]

    const index = cKeys.indexOf(key)
    index === -1 ? cKeys.push(key) : cKeys.splice(index, 1)

    _contracts[key].isSelected = e.target.checked

    setContracts(_contracts)
    setForDeletion(cKeys)
  }

  const deleteContracts = (e) => {
    const leftOverContracts = contracts.filter((_, i) => !forDeletion.includes(`${i}`))
    setContracts(leftOverContracts)
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(leftOverContracts))
  }

  const selectAll = (e) => {
    const keysForDeletions = []

    const _contracts = contracts.map((contract, i) => {
      if (e.target.checked) {
        keysForDeletions.push(`${i}`)
      }

      return { ...contract, isSelected: e.target.checked }
    })

    setContracts(_contracts)
    setForDeletion(keysForDeletions)
  }

  const toggleItemAddress = (key) => {
    const _contracts = [...contracts]

    _contracts[key].showAddress = !(_contracts[key]?.showAddress || false)
    setContracts(_contracts)
  }

  return (
    <Container>
      <HistoryTitle>Previous Contracts</HistoryTitle>
      <HistoryCTA>
        <Button
          hierarchy='secondary'
          disabled={contracts.length === 0}
          size='sm'
          iconLeading
          iconVariant='align-bottom-01'
          onClick={download}
        >Download Backup
        </Button>
        <Button
          hierarchy='secondary'
          size='sm'
          iconLeading
          iconVariant='refresh-ccw-02'
          onClick={restore}
        >Restore
        </Button>
      </HistoryCTA>
      <DeleteSection>
        {contracts.length > 0 && <Checkbox onClick={selectAll} />}
        {contracts.length > 0 && forDeletion.length > 0 && (
          <DeleteButton onClick={deleteContracts}>
            <Icon variant='trash-01' size='15' />
          </DeleteButton>
        )}
      </DeleteSection>
      <HistoryList>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <React.Fragment key={`contract-${i}`}>
              <HistoryListItem>
                <Checkbox checked={contract?.isSelected || false} onChange={selected} data-key={i} />
                <Item data-key={i} onClick={restoreSpecificContract}>{contract.contract_name || 'Untitled'}</Item>

                <BtnAddress onClick={() => toggleItemAddress(i)}>
                  <Icon variant={contract.showAddress ? 'chevron-up' : 'chevron-down'} size='15' />
                </BtnAddress>
              </HistoryListItem>
              {
                contract.showAddress && (
                  <HistoryListItemAddress>
                    {contract.address}
                  </HistoryListItemAddress>
                )
              }

            </React.Fragment>
          )
        })}
      </HistoryList>
      {restorationFailed && <Error>Restoration failed invalid format.</Error>}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px;
  border: 1px solid ${colors.gray[300]};
  border-radius: 8px;
  height: 302px;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (min-width: 1024px) { 
    height: 516px;
  }

  .dark & {
    border: 1px solid ${colors.gray[500]};
  }
`

const HistoryTitle = styled.h2`
  color: ${colors.gray[900]};
  ${typography.styles.textLg}
  ${typography.weights.bold}

  .dark & {
    color: ${colors.white};
  }
`

const DeleteSection = styled.div`
  border-bottom: 1px solid ${colors.gray[300]};
  margin-top: 16px;
  padding: 4px 0 12px 0;
  display: flex;
  gap: 14px;

  input {
    height: 15px;
    margin: 0;
  }
`

const BtnAddress = styled.button``

const DeleteButton = styled.button`

  i {
    color: ${colors.primary[700]};

    .dark & {
      color: ${colors.white};
    }
  }
`

const HistoryList = styled.ul`
  width: 342px;
  padding: 0;
  margin-top: 8px;

  @media (min-width: 768px) {
    width: 100%;
  }

`
const HistoryListItem = styled.li`
  word-wrap: break-word;
  color: ${colors.gray[900]};
  cursor: pointer;
  list-style-type: none;
  display: flex;
  margin-bottom: 8px;
  gap: 8px;

  ${typography.weights.medium}
  ${typography.styles.textSm}

  .dark & {
    color: ${colors.white};
  }
`

const HistoryListItemAddress = styled.span`
  display: inline-block;
  padding: 10px;
  margin-bottom: 8px;
  width: 100%;
  word-wrap: break-word;

  background-color: ${colors[primaryColorKey][25]};
  border-bottom: 1px solid ${colors.gray[200]};

  .dark & {
    background-color: ${colors.gray[900]};
    border-bottom: 1px solid ${colors.gray[700]};
  }
`

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
  cursor: pointer;
`

const Item = styled.span`
  width: 100%;
  color: ${colors.gray[900]};

  ${typography.weights.regular}

  .dark & {
    color: ${colors.white};
  }
`

const HistoryCTA = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 16px;
  gap: 8px;

  button {
    color: ${colors[primaryColorKey][600]};
    ${typography.styles.textSm}
    ${typography.weights.semibold}
    background-color: ${colors.white};
    border-radius: 8px;
    padding: 4px 12px;

    &:not(:disabled) {
      &[data-state="hover"], &:hover {
        color: ${colors[primaryColorKey][600]} !important;
      }
    }
  }

  .dark & {
    button {
      color: ${colors.gray[700]};

      &:not(:disabled) {
        &[data-state="hover"], &:hover {
          color: ${colors.gray[700]} !important;
        }
      }
    }
  }
`

const Error = styled.p`
  color: ${colors.error[800]};
  margin-top:6px;
  ${typography.styles.textSm};
  ${typography.weights.regular};

  .dark & {
    color: ${colors.error[600]};
  }
`

export { History }
