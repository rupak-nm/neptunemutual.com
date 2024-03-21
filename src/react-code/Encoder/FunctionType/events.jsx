import { useState } from 'react'
import './events.scss'
import { useGetLogs } from '../hooks/useGetLogs'
import { InputWithLabel } from '../../components/InputWithLabel/InputWithLabel'
import { Button } from '../../components/Button/Button'

const Events = ({ address, func, encodeInterface }) => {
  const [fromBlock, setFromBlock] = useState('')
  const [toBlock, setToBlock] = useState('')

  const [logs, setLogs] = useState([])

  const { isReady, getLogs, loading, error, resetError } = useGetLogs({
    address,
    func,
    iface: encodeInterface
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const logs = await getLogs(fromBlock, toBlock)
      setLogs(logs)
    } catch (err) {
      console.error(err)
    }
  }

  const handleInputChange = (field, event) => {
    resetError()

    if (field === 'fromBlock') {
      setFromBlock(event.target.value)
    } else {
      setToBlock(event.target.value)
    }
  }

  return (
    <div className="events container">
      <form onSubmit={handleSubmit}>
        <div className='row'>
          <InputWithLabel
            label={<>Enter the <span>from</span> block number</>}
            placeholder={'1'}
            type={'number'}
            id={'events-input-from-block'}
            onChange={e => handleInputChange('fromBlock', e)}
            value={fromBlock}
            />

          <InputWithLabel
            label={<>Enter the <span>to</span> block number</>}
            placeholder={'1200'}
            type={'number'}
            id={'events-input-to-block'}
            onChange={e => handleInputChange('toBlock', e)}
            value={toBlock}
            />

          <Button
            variant='primary'
            size='sm'
            type='submit'
            disabled={!isReady || !fromBlock || !toBlock || loading}
            >
            {loading ? 'Loading...' : 'Get Events'}
          </Button>
        </div>

        <p className='error'>{error}</p>
      </form>

      {
        Boolean(logs.length) && (
          <div className='logs'>
            <table>
              <thead>
                <tr>
                  <th>Transaction Hash</th>
                  <th>Block Number</th>
                  <th>Log Index</th>
                  <th>Arguments</th>
                </tr>
              </thead>

              <tbody>
                {
                  logs.map((log, i) => (
                    <tr key={i}>
                      <td className='tx hash'>{log.transactionHash}</td>
                      <td className='block number'>{log.blockNumber}</td>
                      <td className='log index'>{log.logIndex}</td>
                      <td className='args'>
                        <details>
                          <summary>Show args</summary>
                          <pre>{log.argsString}</pre>
                        </details>
                      </td>
                    </tr>
                  ))
                }
                </tbody>
            </table>
          </div>
        )
      }
    </div>
  )
}

export { Events }
