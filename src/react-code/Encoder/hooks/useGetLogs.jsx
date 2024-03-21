import { useCallback, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { getArgsString, getEventTopic } from '../helpers/web3-tools/events'

const useGetLogs = ({ address, func, iface }) => {
  const { library } = useWeb3React()

  const topics = useMemo(() => [getEventTopic(func)], [func])

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const getLogs = useCallback(async (fromBlock, toBlock) => {
    if (!library || !library.getLogs || !address || !topics) {
      return
    }

    const fromBlockHex = '0x' + ethers.BigNumber.from(fromBlock).toNumber().toString(16)
    const toBlockHex = '0x' + ethers.BigNumber.from(toBlock).toNumber().toString(16)
    const id = 44
    const jsonrpc = '2.0'

    setError('')
    setLoading(true)

    try {
      const logs = await library.getLogs({
        fromBlock: fromBlockHex,
        toBlock: toBlockHex,
        address,
        topics,
        id,
        jsonrpc
      })

      return logs.map(log => ({
        blockNumber: ethers.BigNumber.from(log.blockNumber).toNumber(),
        blockHash: log.blockHash,
        transactionIndex: log.transactionIndex,
        removed: log.removed,
        address: log.address,
        data: log.data,
        argsString: getArgsString(iface, log),
        topics: log.topics,
        transactionHash: log.transactionHash,
        logIndex: log.logIndex
      }))
    } catch (error) {
      console.error(error)
      setError(error.data.message)
    } finally {
      setLoading(false)
    }

    return []
  }, [library, address, topics, iface])

  const isReady = useMemo(() => {
    return library && library.getLogs
  }, [library])

  return {
    isReady,
    getLogs,
    loading,

    error,
    resetError: () => setError('')
  }
}

export { useGetLogs }
