const post = async (email) => {
  try {
    const payload = {
      email,
      mock: window.mock
    }

    if (!window.server) {
      return { valid: false }
    }

    const body = JSON.stringify(payload, null, 2)

    const url = new URL('/subscribe', window.server)

    const response = await fetch(url, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()

    if (!response.ok) {
      const { code, data } = result
      return { valid: false, message: [code, data].join(': ') }
    }

    return { valid: true }
  } catch (error) {
    return { valid: false, message: error.toString() }
  }
}

export { post }
