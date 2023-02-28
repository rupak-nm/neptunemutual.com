import { debounce } from '../../../../util/debounce'
import { filterHackData } from './filter'

let previousSearchQuery: string | undefined

const setupSearch = (): void => {
  const input = document.querySelector('.hack.search.input')

  const inputDebounce = debounce((searchQuery: string) => {
    if (previousSearchQuery !== searchQuery) {
      previousSearchQuery = searchQuery
      filterHackData(1).catch(console.error)
    }
  }, 500)

  const onKeyup: EventListener = (e: Event) => {
    const inputValue = (e.target as HTMLInputElement).value
    inputDebounce(inputValue)
  }

  input?.addEventListener('keyup', onKeyup, { passive: true })
}

export { setupSearch }
