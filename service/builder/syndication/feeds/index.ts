import { build } from './builder'

const generate = async (): Promise<void> => {
  const promises = [build('blog'), build('pressroom')]

  const result = await Promise.allSettled(promises)
  const errors = result.filter(x => x.status === 'rejected')

    ; (errors.length > 0) && console.log(errors)
}

export { generate }
