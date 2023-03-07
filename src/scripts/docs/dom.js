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
  createEl({
    appendTo: header,
    type: 'a',
    className: 'link icon',
    attributes: [...attributes, { key: 'target', value: '_blank' }]
  })

  createEl({ appendTo: anchor, type: 'div', className: 'content', html: content })

  const footer = createEl({ appendTo: anchor, type: 'div', className: 'footer' })
  createEl({ appendTo: footer, type: 'button', className: 'copy button' })
  createEl({ appendTo: footer, type: 'a', className: 'link icon', attributes })
}

export { compose }
