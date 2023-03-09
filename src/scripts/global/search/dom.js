const createEl = ({ type, html, className, attributes, appendTo }) => {
  const el = document.createElement(type)

  if (html) {
    el.innerHTML = html
  }

  if (className) {
    el.className = className
  }

  for (const attribute of attributes || []) {
    const { key, value } = attribute

    el.setAttribute(key, value)
  }

  if (appendTo) {
    appendTo.append(el)
  }

  return el
}

const compose = (href, title, content) => {
  const parent = document.querySelector('.search.result')
  const attributes = [{ key: 'href', value: href }]

  const anchor = createEl({ appendTo: parent, type: 'div', className: 'item' })
  const header = createEl({ appendTo: anchor, type: 'div', className: 'header' })

  createEl({ appendTo: header, type: 'div', className: 'file icon' })
  createEl({ appendTo: header, type: 'div', className: 'title', html: title })

  const externalLink = createEl({
    appendTo: header,
    type: 'a',
    className: 'external link',
    attributes: [
      ...attributes,
      { key: 'target', value: '_blank' },
      { key: 'data-tooltip', value: 'Open in Newtab' },
      { key: 'data-flow', value: 'left' }
    ],
    html: '<span>New Tab</span>'
  })
  createEl({
    appendTo: externalLink,
    type: 'i',
    className: 'link icon'
  })

  createEl({ appendTo: anchor, type: 'div', className: 'content', html: content })

  const footer = createEl({ appendTo: anchor, type: 'div', className: 'footer' })

  const copyButton = createEl({
    appendTo: footer,
    type: 'button',
    className: 'copy button',
    html: '<span>Copy</span>',
    attributes: [{ key: 'data-tooltip', value: 'Copy URL' }, { key: 'data-link', value: href }]
  })
  createEl({ appendTo: copyButton, type: 'i', className: 'copy icon' })

  const link = createEl({
    appendTo: footer,
    type: 'a',
    className: 'open link',
    html: '<span>Open</span>',
    attributes: [...attributes, { key: 'data-tooltip', value: 'Open URL' }]
  })
  createEl({ appendTo: link, type: 'i', className: 'link icon' })
}

export { compose }
