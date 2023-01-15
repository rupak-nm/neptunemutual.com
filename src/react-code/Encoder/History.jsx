import styled from 'styled-components'

import { Button } from '../components/Button'
import {
  colors,
  primaryColorKey
} from '../styles/colors'
import { typography } from '../styles/typography'

const History = ({ contracts, download, restore, restorationFailed, restoreSpecificCallback }) => {
  const restoreSpecificContract = (key) => {
    const { abi, contract_name: contractName, address } = contracts[key]
    restoreSpecificCallback({ abi, contractName, address })
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
      <HistoryList>
        {contracts.length > 0 && contracts.map((contract, i) => {
          return (
            <HistoryListItem key={`contract-${i}`} onClick={() => { return restoreSpecificContract(i) }}>
              {contract.contract_name || 'Untitled'}
            </HistoryListItem>
          )
        })}
      </HistoryList>
      {restorationFailed && <Error>Restoration failed invalid format.</Error>}
    </Container>
  )
}

const Container = styled.div`
  padding: 24px 0px 24px 24px;
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

const HistoryList = styled.ul`
  width: 342px;
  
`
const HistoryListItem = styled.li`
  word-wrap: break-word;
  ${typography.weights.medium}
  ${typography.styles.textSm}
  color: ${colors.gray[900]};
  cursor: pointer;

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
