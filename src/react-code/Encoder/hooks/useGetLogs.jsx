import { useCallback, useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import { getArgs, getBlockTimestamp, getEventTopic } from '../helpers/web3-tools/events'

const useGetLogs = ({ address, functions, iface }) => {
  const { library } = useWeb3React()

  const topics = useMemo(() => {
    return [functions.map(func => getEventTopic(func))]
  }, [functions])

  const [loading, setLoading] = useState(false)

  const [noLogs, setNoLogs] = useState(false)

  const [error, setError] = useState(null)

  const isReady = useMemo(() => {
    return library && library.getLogs
  }, [library])

  const getLogs = useCallback(async (fromBlock, toBlock) => {
    setNoLogs(false)
    setError(null)

    if (!isReady) {
      setError({
        type: 'warning',
        message: 'Please connect your wallet'
      })
      return []
    }

    if (!library || !library.getLogs || !address || !topics) {
      return []
    }

    const fromBlockHex = '0x' + ethers.BigNumber.from(fromBlock).toNumber().toString(16)
    const toBlockHex = '0x' + ethers.BigNumber.from(toBlock).toNumber().toString(16)
    const id = 44
    const jsonrpc = '2.0'

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

      if (!logs.length) {
        setNoLogs(true)
        return []
      }

      const parsedLogs = []

      for (const topic of topics[0]) {
        const topicLogs = logs.filter(log => log.topics.includes(topic))

        const parsedTopicLogs = []

        for (const log of topicLogs) {
          const blockTimestamp = await getBlockTimestamp(library, log.blockNumber)
          parsedTopicLogs.push({
            blockNumber: ethers.BigNumber.from(log.blockNumber).toNumber(),
            timestamp: blockTimestamp,
            blockHash: log.blockHash,
            transactionIndex: log.transactionIndex,
            removed: log.removed,
            address: log.address,
            data: log.data,
            args: getArgs(iface, log),
            topics: log.topics,
            transactionHash: log.transactionHash,
            logIndex: log.logIndex
          })
        }

        parsedLogs.push(parsedTopicLogs)
      }

      return parsedLogs
    } catch (error) {
      console.error(error)
      const errorMessage = (error.data.message || error.message).split('\n')[0]
      setError({
        type: 'error',
        message: errorMessage
      })
    } finally {
      setLoading(false)
    }

    return []
  }, [library, address, topics, iface])

  return {
    isReady,
    getLogs,
    loading,

    error,
    resetError: () => {
      setError(null)
      setNoLogs(false)
    },
    noLogs
  }
}

export { useGetLogs }
