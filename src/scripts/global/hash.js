setTimeout(() => {
  if (!window.location.hash) {
    return
  }

  const el = document.querySelector(window.location.hash)

  if (!el) {
    return
  }

  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  })
}, 1000)
