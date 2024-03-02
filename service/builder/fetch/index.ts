/* ----------------------------------------- */
// Do not edit this file
/* ----------------------------------------- */

// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import { Api } from '../../../types/enum.js'
import { env } from '../../../util/env.js'
import { parseResponse } from './parse.js'
import { get } from './request.js'

const resources: ApiResource[] = [
  [Api.Contract, 'https://api.neptunemutual.net/protocol/contracts', true],
  [Api.ContractArbitrum, 'https://api.neptunemutual.net/protocol/contracts/arbitrum', true],
  [Api.ContractMumbai, 'https://api.neptunemutual.net/protocol/contracts/mumbai', true],
  [Api.ContractBSC, 'https://api.neptunemutual.net/protocol/contracts/bsc', true],
  [Api.Media, 'api/media?limit=2000'],
  [Api.Blog, 'api/articles?limit=2000'],
  [Api.Doc, 'api/docs?limit=2000'],
  [Api.Pressroom, 'api/pressroom?limit=2000'],
  [Api.Ecosystem, 'api/ecosystems?limit=2000'],
  [Api.Policy, 'api/pages?limit=2000'],
  [Api.Roadmap, 'api/roadmap?limit=2000'],
  [Api.Vacancy, 'api/vacancies?limit=2000'],
  [Api.Audit, 'api/audits?limit=2000'],
  [Api.News, 'api/news?limit=2000'],
  [Api.Program, 'api/programs?limit=2000'],
  [Api.Video, 'api/videos?limit=2000'],
  [Api.Hack, 'api/hacks?limit=20000'],
  [Api.CommunityBlogs, 'https://community.neptunemutual.com/c/general/4.json', true]
]

const build = (): Array<Promise<{ url: string, identifier: string, string: string }>> => {
  const promises: Array<Promise<{ url: string, identifier: string, string: string }>> = []

  for (const resource of resources) {
    const [identifier, path, fqu] = resource
    const origin: string = env('WEBSITE_API_ORIGIN')

    // fully qualified uri
    const url = fqu === undefined ? `${origin}/${path}` : path

    promises.push(get(url, identifier))
  }

  return promises
}

const fetchFromApi = async (): Promise<Array<{ identifier: string, data: string }>> => {
  const result = []

  const tasks = build()
  const items = await Promise.allSettled(tasks) as Array<{ status: 'fulfilled' | 'rejected', value: { identifier: string, string: string } }>

  for (const item of items) {
    if (item === null || item === undefined) {
      continue
    }

    const { value: { identifier, string } } = item
    const data = parseResponse(string, identifier as Api)
    result.push({ identifier, data })
  }

  return result
}

export { fetchFromApi }
