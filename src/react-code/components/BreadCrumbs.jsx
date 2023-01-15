import { Fragment } from 'react'

import styled from 'styled-components'

import { colors } from '../styles/colors'
import { typography } from '../styles/typography'
import { Icon } from './Icon'

const Breadcrumbs = (props) => {
  const t = (x) => x

  return (
    <Trail className={props?.className}>
      {props.crumbs.map((link, i) => {
        return (
          <Fragment key={`link-${i}`}>
            <Crumb>
              {link.link
                ? (
                  <a href={link.link}>
                    {t(`${link.name}`)}
                  </a>
                  )
                : (
                  <>
                    {t(`${link.name}`)}
                  </>
                  )}
            </Crumb>
            {i < (props.crumbs.length - 1) && <Icon size='15' variant='chevron-right' />}
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
  ${typography.styles.textSm}
  ${typography.weights.medium}
  color: ${colors.gray[600]};
  padding: 4px 8px;
  cursor: pointer;

  &:nth-of-type(1) {
    margin-left: -8px;
  }

  &:nth-last-of-type(1) {
    background-color: ${colors.gray[200]};
    color: ${colors.gray[700]};
    border-radius: 6px;
    ${typography.weights.semibold}
  }

  &:not(:nth-last-of-type(1)):hover{
    background-color: ${colors.gray[50]};
    border-radius:6px;
    color: ${colors.gray[700]};
  }

  a, a:hover {
    color: inherit;
  }

  .dark & {
    color: ${colors.gray[300]};

    &:nth-last-of-type(1) {
      background-color: ${colors.gray[600]};
      color: ${colors.gray[25]};
    }

    &:not(:nth-last-of-type(1)):hover{
      background-color: ${colors.gray[600]};
      color: ${colors.gray[25]};
    }
  }
`

export { Breadcrumbs }
