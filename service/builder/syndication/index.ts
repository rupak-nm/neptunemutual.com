import { tasks } from './tasks'

const generate = async (): Promise<void> => {
  console.time('Generating Syndication')
  const promises = []

  for (const task of tasks) {
    promises.push(task())
  }

  await Promise.allSettled(tasks)
  console.timeEnd('Generating Syndication')
}

export { generate }
