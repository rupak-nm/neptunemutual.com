import React from 'react'

import { paths } from '../../elements/icons/paths'

export const Icon = ({ variant, size }) => {
  const [innerHTML, setInnerHTML] = React.useState(null)

  React.useEffect(() => {
    if (variant !== undefined) {
      try {
        paths[variant]
          .then(x => setInnerHTML(x.default))
          .catch(e => console.error(`Error loading icon: ${variant}`, e))
      } catch (e) {
        console.error(`Icon not found: ${variant}`)
      }
    }
  }, [variant])

  return (
    <i data-size={size} dangerouslySetInnerHTML={{ __html: innerHTML || variant }} />
  )
}
