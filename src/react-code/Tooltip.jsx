import { useRef, useState } from 'react'
import styled, { css } from 'styled-components'
import { colors } from './styles/colors'
import { shadows } from './styles/shadows'
import { typography } from './styles/typography'

/**
 *
 * @param {Object} params
 * @param {React.ReactNode} params.children
 * @param {React.ReactNode | string} params.infoComponent
 * @param {"top" | "right" | "bottom" | "left"} [params.position]
 * @param {boolean} [params.arrow]
 * @returns
 */
export const Tooltip = ({
  children,
  infoComponent,
  position = 'top',
  arrow = true
}) => {
  const [showContent, setShowContent] = useState(false)
  const ref = useRef(null)
  const [align, setAlign] = useState('middle')

  const handleMouseEnter = (isTouch = false) => {
    if (!ref.current || !window) return

    if (ref.current) {
      const calculateAndReposition = () => {
        const boundingInfo = ref.current.getBoundingClientRect()
        const width = window.innerWidth
        const overflowingRight = (boundingInfo.x + boundingInfo.width + 50) > width
        const overflowingLeft = boundingInfo.x <= 0

        if (overflowingRight) setAlign('right')
        else if (overflowingLeft) setAlign('left')
      }

      if (isTouch) {
        setTimeout(() => {
          calculateAndReposition()
        }, [100])
      } else calculateAndReposition()
    }
  }

  return (
    <TooltipRoot>
      <TooltipTrigger
        onMouseEnter={() => handleMouseEnter()}
        onTouchStart={() => handleMouseEnter(true)}
      >
        {children}
      </TooltipTrigger>
      <TooltipContent
        className='content'
        data-side={position}
        data-align={align}
        data-show={showContent ? 'true' : 'false'}
        ref={ref}
      >
        {infoComponent}
      </TooltipContent>

      {arrow && (
        <TooltipArrow
          className='arrow'
          onMouseEnter={() => setShowContent(true)}
          onMouseLeave={() => setShowContent(false)}
        >
          <Shape />
        </TooltipArrow>
      )}
    </TooltipRoot>
  )
}

const TooltipRoot = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`

const TooltipArrow = styled.div`
  display: none;

  filter: drop-shadow(4px 4px 12px rgba(16, 24, 40, 1));
  width: 16px;
  height: 16px;

  z-index: 61;

  &:hover {
    display: block;
  }
`

const Shape = styled.div`
  height: 100%;
  width: 100%;
  clip-path: polygon(100% 0, 0 0, 50% 50%);
  background-color: ${colors.white};
  .dark & {
    background-color: ${colors.gray[900]};
  }
`

const positionStyles = css`
  position: absolute;
  
  & + .arrow {
    position: absolute;
  }

  &[data-side="top"] {
    bottom: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  
    & + .arrow {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }
  }

  &[data-side="bottom"] {
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
  
    & + .arrow {
      top: 100%;
      left: 50%;
      transform: translateX(-50%) rotate(180deg)
    }
  }

  &[data-side="right"] {
    left: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
  
    & + .arrow {
      left: 100%;
      top: 50%;
      transform: translateY(-50%) rotate(90deg)
    }
  }

  &[data-side="left"] {
    right: calc(100% + 15px);
    top: 50%;
    transform: translateY(-50%);
  
    & + .arrow {
      right: 100%;
      top: 50%;
      transform: translateY(-50%) rotate(270deg)
    }
  }

  &[data-align="right"] {
    transform: translateX(-98%);
    
    & + .arrow {
      transform: translateX(-99%);
    }
  }

  &[data-align="left"] {
    left: 0;
    transform: translateX(-1%);
    
    & + .arrow {
      left: 0%;
      transform: translateX(0%);
    }
  }
`

const TooltipContent = styled.div`
  ${positionStyles}

  display: none;
  flex-direction: column;
  row-gap: 4px;
  min-width: 224px;
  z-index: 99;
  border-radius: 8px;
  padding: 8px 12px;

  background-color: ${colors.white};
  border: 1px solid ${colors.gray[100]};
  color: ${colors.gray[700]};

  .dark & {
    background-color: ${colors.gray[900]};
    border: 1px solid ${colors.gray[900]};
    color: ${colors.white};
  }

  box-shadow: ${shadows.lg};  
  ${typography.styles.textXs};
  ${typography.weights.semibold};

  &[data-show="true"] {
    display: flex;
  }

  &:hover {
    display: flex;
  }

  &:hover + .arrow {
    display: block;
  } 
`

const TooltipTrigger = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;

  &:hover + .content {
    display: flex;
  }

  &:hover ~ .arrow {
    display: block;
  }
`
