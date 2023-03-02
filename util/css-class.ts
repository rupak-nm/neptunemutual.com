const normalize = (className: string): string => {
  return className.replace(/\s{2,}/g, ' ').trim()
}

export { normalize }
