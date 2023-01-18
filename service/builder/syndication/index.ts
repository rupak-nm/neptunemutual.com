import { tasks } from './tasks'

const generate = async (): Promise<void> => {
  const promises = []

  for (const task of tasks) {
    promises.push(task())
  }

  await Promise.allSettled(tasks)
}

await generate()

export { generate }
