export const handleCopy = (text, cb = () => {}) => {
  try {
    navigator.clipboard.writeText(text)
    cb()
  } catch (error) {
    console.log('Unable to copy \nSee Error below:\n', error)
  }
}
