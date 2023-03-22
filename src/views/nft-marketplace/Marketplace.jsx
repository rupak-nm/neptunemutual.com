import React from '@astrojs/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { NftCard } from '../../components/NftCard'
import { Pagination } from './Pagination'
import { NftMarketplace } from '../../../service/remote-api/nft-marketplace'
import { useDebounce } from './hooks/useDebounce'
import { Filter } from './Filter'

const MarketPlace = ({ initialData = [], imageOrigin, apiOrigin, filters = [] }) => {
  const [searchValue, setSearchValue] = useState('')
  const [properties, setProperties] = useState([])
  const [data, setData] = useState(initialData)
  const initial = useRef(true)

  const debouncedSearchValue = useDebounce(searchValue, 500)

  useEffect(() => {
    makeApiCall(1, debouncedSearchValue, properties)
    initial.current = false
  }, [debouncedSearchValue, properties])

  const [curentPage, totalPages] = useMemo(() => {
    if (!data.length) return [1, 1]

    return [
      data[0].pageNumber,
      data[0].totalPages
    ]
  }, [data])

  const makeApiCall = useCallback((_page, _searchValue, _properties) => {
    if (initial.current) return

    (async function async () {
      try {
        const { data: _data } = await NftMarketplace.searchMarketplace(_searchValue, _properties, _page, undefined, apiOrigin)
        if (_data && Array.isArray(_data)) {
          setData(_data)
        }
      } catch {}
    })()
  }, [apiOrigin])

  const handleInputChange = (e) => {
    // initial.current = false
    setSearchValue(e.target.value)
  }

  const handlePageChange = (page) => {
    // initial.current = false
    makeApiCall(page, searchValue)
  }

  return (
    <div className='nft marketplace search container'>
      <div className='inner container'>
        <Filter
          setProperties={setProperties}
          filters={filters}
        />

        <div className='right'>
          <div>
            <input
              placeholder="Search"
              className='search input'
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className='nft grid'>
              {
                data.map((nft, i) => (
                  <NftCard
                    key={i}
                    name={nft.nickname}
                    nftId={nft.tokenId}
                    views={nft.views}
                    count={nft.siblings}
                    image={nft.image || `${imageOrigin}/images/${nft.tokenId}.png`}
                  />
                ))
              }
            </div>
          </div>

          <Pagination
            currentPage={curentPage}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  )
}

export { MarketPlace }
