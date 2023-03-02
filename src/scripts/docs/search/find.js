const coalesce = (x, or) => {
  return x ?? or
}

const find = (searchTerm) => {
  searchTerm = coalesce(searchTerm, '')

  const results = window.docs.filter((x) => {
    return (
      coalesce(x.title, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.subtitle, '').toLowerCase().indexOf(searchTerm.toLowerCase()) >
        -1 ||
      coalesce(x.text, '').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    )
  })

  if (!results || results.length === 0) {
    return null
  }

  return results.slice(0, 10)
}

export { find }
