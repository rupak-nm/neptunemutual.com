const debounce = (func: Function, timeout: number = 300): Function => {
  let timer: NodeJS.Timeout | undefined
  return (...args: any[]) => {
    const next = (): any => func(...args)
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(next, timeout)
  }
}

export { debounce }
