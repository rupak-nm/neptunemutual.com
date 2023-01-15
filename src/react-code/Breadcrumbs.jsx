import { Fragment } from 'react'

import styled from 'styled-components'

import { colors } from './styles/colors'
import { typography } from './styles/typography'

const t = (x) => x
const Breadcrumbs = (props) => {
  return (
    <Trail className={props?.className}>
      {props.crumbs.map((link, i) => {
        return (
          <Fragment key={`link-${i}`}>
            <Crumb>
              {link.link
                ? (
                  <a href={link.link}>{t(`${link.name}`)}</a>
                  )
                : (
                  <>{t(`${link.name}`)}</>
                  )}
            </Crumb>
            {i < (props.crumbs.length - 1) && <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg' width='15' height='15'><path d='m9 18 6-6-6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /></svg>}
          </Fragment>
        )
      })}
    </Trail>
  )
}

const Trail = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 36px;
  flex-wrap: wrap;
  gap: 8px;

  svg {
    color: ${colors.gray[300]};
    flex-shrink: 0;
  }

  @media (max-width: 767px) {
    margin-bottom: 28px;
  }
`
const Crumb = styled.span`
  display: inline-block;
  ${typography.styles.textSm};
  ${typography.weights.medium};
  color: ${colors.gray[600]};
  .dark & {
    color: ${colors.gray[300]};
  }
  padding: 4px 8px;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-left: -8px;
  }

  &:nth-last-of-type(1) {
    background-color: ${colors.gray[200]};
    .dark & {
      background-color: ${colors.gray[600]};
    }
    color: ${colors.gray[700]};
    .dark & {
      color: ${colors.gray[25]};
    }
    border-radius: 6px;
    ${typography.weights.semibold};
  }

  &:not(:nth-last-of-type(1)):hover {
    background-color: ${colors.gray[50]};
    .dark & {
      background-color: ${colors.gray[600]};
    }
    border-radius: 6px;
    color: ${colors.gray[700]};
    .dark & {
      color: ${colors.gray[25]};
    }
  }

  a,
  a:hover {
    color: inherit;
  }
`

export { Breadcrumbs }
