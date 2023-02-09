function debounce (func: Function, timeout?: number): Function {
  let timer: NodeJS.Timeout | undefined
  return (...args: any[]) => {
    const next = (): any => func(...args)
    if (timer != null) {
      clearTimeout(timer)
    }
    timer = setTimeout(next, (timeout ?? 0) > 0 ? timeout : 300)
  }
}

export { debounce }
