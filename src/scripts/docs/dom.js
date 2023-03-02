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

  const anchor = createEl({ appendTo: parent, type: 'a', className: 'item', attributes })
  const header = createEl({ appendTo: anchor, type: 'div', className: 'highlighted header' })

  createEl({ appendTo: header, type: 'div', className: 'icon' })
  createEl({ appendTo: header, type: 'div', className: 'title', html: title })

  createEl({ appendTo: anchor, type: 'div', className: 'highlighted content', html: content })
}

export { compose }
