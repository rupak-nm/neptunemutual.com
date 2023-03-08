const copyToClipboard = async (text, cb = () => { }) => {
  try {
    await navigator.clipboard.writeText(text)
    cb()
  } catch (error) {
    console.log('Unable to copy \nSee Error below:\n', error)
  }
}

export { copyToClipboard }
