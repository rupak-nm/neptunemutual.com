const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec']

const getMonthName = (unixTimestamp: string): string => {
  const d = new Date(parseInt(unixTimestamp) * 1000)
  const i = parseInt(d.toISOString().split('-')[1]) - 1

  return months[i]
}

const isExpired = (unixTimestamp: string): boolean => {
  return new Date().getTime() > new Date(parseInt(unixTimestamp) * 1000).getTime()
}

export { getMonthName, isExpired, months }
