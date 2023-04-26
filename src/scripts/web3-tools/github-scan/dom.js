import { createEl } from '../../global/search/dom'

function toggleElementVisibility ({ element, parent = document, selector, show, hideClass = ['initially', 'hidden'] }) {
  const elements = element ?? parent.querySelectorAll(selector)

  if (!element) {
    elements.forEach(el => {
      el.classList.add(...hideClass)
      if (show) el.classList.remove(...hideClass)
    })
    return
  }

  if (element?.classList) {
    element.classList.add(...hideClass)
    if (show) element.classList.remove(...hideClass)
    return
  }

  console.error('Invalid element: ', { element, parent, selector })
}

function updateInnerHtml ({ element, parent = document, selector, newHtml }) {
  const elements = element ?? parent.querySelectorAll(selector)

  if (!element) {
    elements.forEach(el => {
      el.innerHTML = newHtml
    })
    return
  }

  if (element) {
    element.innerHTML = newHtml
    return
  }

  console.error('Invalid element: ', { element, parent, selector })
}

function appendTableRows ({ tableBodyElement, parent = document, tableBodySelector, rowData = [] }) {
  const tableBody = tableBodyElement ?? parent.querySelector(tableBodySelector)

  if (tableBody) {
    rowData.map(data => {
      const row = createEl({
        type: 'tr',
        appendTo: tableBody
      })

      Object.values(data).map(val => {
        createEl({
          type: 'th',
          appendTo: row,
          html: val
        })

        return null
      })

      return null
    })

    return
  }

  console.error('Invalid element: ', { tableBodyElement, parent, tableBodySelector })
}

export { toggleElementVisibility, updateInnerHtml, appendTableRows }
