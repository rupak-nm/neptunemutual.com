import React from '@astrojs/react'
import { getPagination } from '../../../util/pagination'
import { Icon } from '../../react-code/components/Icon'

const t = (x) => x

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const { previous, pages, next } = getPagination(totalPages, currentPage)

  return (
    <div className={'ui pagination'}>
      <div className="container">
        <button
          className='previous page'
          disabled={!previous}
          onClick={() => onChange(previous)}
        >
          <Icon variant={'arrow-left'} />
          <span>{t('Previous')}</span>
        </button>

        <div className="page numbers">
          {
            pages &&
              pages.map((page, index) => {
                return page
                  ? (
                  <button
                    key={index}
                    className={`button page ${
                      currentPage === page ? 'active' : ''
                    }`}
                    onClick={() => onChange(page)}
                  >
                    {page}
                  </button>
                    )
                  : (
                  <span key={index} className="continues"> ... </span>
                    )
              })
          }
        </div>

        <button
          className={'next page'}
          disabled={!next}
          onClick={() => onChange(next)}
        >
          <span>{t('Next')}</span>
          <Icon variant={'arrow-right'} />
        </button>
      </div>
    </div>
  )
}

export { Pagination }
