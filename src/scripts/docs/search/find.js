const dictionary = ['a', 'an', 'the']

const infer = (x) => {
  for (const item of dictionary) {
    x = (x || '')
      .replaceAll(` ${item} `, ' ')

    x = (x || '')
      .replaceAll(` ${item[0].toUpperCase() + item.slice(1)} `, ' ')
  }

  return x.trim()
}

const find = (searchTerm) => {
  searchTerm = infer(searchTerm)

  const results = window.docs.filter((x) => {
    return (
      (infer(x.title) || '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      (infer(x.subtitle) || '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      (infer(x.text) || '').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  })

  if (!results || results.length === 0) {
    return null
  }

  return results.slice(0, 10)
}

export { find }
