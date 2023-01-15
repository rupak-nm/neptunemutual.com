import styled from 'styled-components'

export const Loader = ({ ...rest }) => {
  return (
    <Svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      {...rest}
    >
      <Circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <Path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
      />
    </Svg>
  )
}

const Svg = styled.svg`
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  
  margin-left: -4px;
  margin-right: 12px;
  height: 32px;
  width: 32px;
  color: #4e7dd9;
  animation: spin 1s linear infinite;
  `

const Circle = styled.circle`
  opacity: 0.25;
  stroke: #4e7dd9;
  `

const Path = styled.path`
  opacity: 0.75;
  fill: #4e7dd9;
`
