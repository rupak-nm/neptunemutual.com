/* ----------------------------------------- */
// Do not edit this file
/* ----------------------------------------- */

import Enumerable from 'linq'
import path from 'path'

import { Api } from '../../types/enum'
import * as io from '../../util/io'
import { config } from './config'

const getApi = async <T>(api: Api): Promise<ApiResult<T>> => {
  if (!Object.values(Api).includes(api)) {
    throw new Error(`Invalid type ${api}`)
  }

  try {
    const file = path.join(config.root, `${api}.json`)
    const contents = await io.readFile(file)
    const result = JSON.parse(contents)
    return result
  } catch (error) {
    console.error(error)
  }

  const result: ApiResult<T> = {
    docs: [] as T[],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }

  return result
}

const getContracts = async (api: (Api.Contract | Api.ContractArbitrum | Api.ContractFuji)): Promise<ApiResponse<ProtocolContracts>> => {
  const contracts = [Api.Contract, Api.ContractArbitrum, Api.ContractFuji]
  if (!contracts.includes(api)) {
    throw new Error(`Invalid type ${api} for contract`)
  }

  try {
    const file = path.join(config.root, `${api}.json`)
    const contents = await io.readFile(file)
    const result = JSON.parse(contents)
    return result
  } catch (error) {
    console.error(error)
  }

  const result: ApiResponse<ProtocolContracts> = {
    message: '',
    code: '404',
    data: {
      chainId: 1,
      network: '1',
      contracts: [],
      coverKeys: [],
      pods: [],
      tokens: [],
      pairs: [],
      cxTokens: []
    }
  }

  return result
}

const getEnumerable = async <T>(api: Api, limit: number, skip: number): Promise<T[]> => {
  try {
    const result = await getApi<T>(api)

    let enumerable = Enumerable.from(result.docs)

    if (limit > 0) {
      enumerable = enumerable.take(limit)
    }

    if (skip > 0) {
      enumerable = enumerable.skip(skip)
    }

    const enumerated = enumerable.toArray()

    return enumerated
  } catch (error) {
    console.error(error)
  }

  return []
}

const getApi2 = async <T>(api: Api): Promise<ApiResult<T>> => {
  if (!Object.values(Api).includes(api)) {
    throw new Error(`Invalid type ${api}`)
  }

  const file = path.join('vercel', 'path0', 'public', 'cache', `${api}.json`)

  try {
    const contents = await io.readFile(file)
    const result = JSON.parse(contents)
    return result
  } catch (error) {
    console.error('getApi2 error: ', error)
  }

  const result: ApiResult<T> = {
    docs: [] as T[],
    totalDocs: 0,
    limit: 0,
    totalPages: 0,
    page: 0,
    pagingCounter: 0,
    hasPrevPage: false,
    hasNextPage: false,
    prevPage: null,
    nextPage: null
  }

  return result
}

const getPaginatedByPageNum = async<T>(api: Api, page: number = 1, pageSize: number = 12): Promise<PaginatedResult<T>> => {
  try {
    const { docs } = await getApi2<T>(api)

    const records = docs.length
    const totalPages = Math.ceil(records / pageSize)

    const result: PaginatedResult<T> = {
      records,
      totalPages,
      pageSize,
      pages: {
      }
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize <= records ? start + pageSize : records

    result.pages[page.toString() as keyof PaginatedResult<T>] = docs.slice(start, end)

    return result
  } catch (error) {
    console.error(error)
  }

  return { pages: {} }
}

const getPaginatedByTagsWithPageNum = async (api: Api, page: number = 1, tag: string, pageSize: number = 12): Promise<PaginatedByTagsResult<Article>> => {
  try {
    const { docs } = await getApi2<Article>(api)

    const allTags = docs.map((doc) => doc.tags).flat()
    const uniqueTags = [...new Map(allTags.map((tag: any) => [tag.id, tag])).values()]
    const _tag = uniqueTags.find(t => t.slug === tag)

    const filteredDocs = docs.filter((doc: any) => {
      const matchedTag = doc.tags.find((x: any) => x.slug === _tag.slug)
      return matchedTag
    })

    const records = filteredDocs.length
    const totalPages = Math.ceil(records / pageSize)

    const _result: PaginatedByTagsResult<Article> = {
      tag: _tag,
      records,
      totalPages,
      pageSize,
      pages: {
      }
    }

    const start = (page - 1) * pageSize
    const end = start + pageSize <= records ? start + pageSize : records

    _result.pages[page.toString() as keyof PaginatedByTagsResult<Article>] = filteredDocs.slice(start, end)

    return _result
  } catch (error) {
    console.error(error)
  }

  return {
    tag: null,
    pages: {}
  }
}

const getPaginated = async<T>(api: Api, pageSize: number = 12): Promise<PaginatedResult<T>> => {
  try {
    const { docs } = await getApi<T>(api)

    const records = docs.length
    const totalPages = Math.ceil(records / pageSize)

    const result: PaginatedResult<T> = {
      records,
      totalPages,
      pageSize,
      pages: {
      }
    }

    for (let i = 0; i < totalPages; i++) {
      const prop = (i + 1).toString()
      const start = i * pageSize
      const end = start + pageSize <= records ? start + pageSize : records

      result.pages[prop as keyof PaginatedResult<T>] = docs.slice(start, end)
    }

    return result
  } catch (error) {
    console.error(error)
  }

  return { pages: {} }
}

const getPaginatedByTags = async (api: Api, pageSize: number = 12): Promise<Array<PaginatedByTagsResult<Article>>> => {
  try {
    const { docs } = await getApi<Article>(api)

    const allTags = docs.map((doc) => doc.tags).flat()
    const uniqueTags = [...new Map(allTags.map((tag: any) => [tag.id, tag])).values()]

    const result = uniqueTags.map((tag: any) => {
      const filteredDocs = docs.filter((doc: any) => {
        const matchedTag = doc.tags.find((x: any) => x.slug === tag.slug)
        return matchedTag
      })

      const records = filteredDocs.length
      const totalPages = Math.ceil(records / pageSize)

      const _result: PaginatedByTagsResult<Article> = {
        tag,
        records,
        totalPages,
        pageSize,
        pages: {
        }
      }

      for (let i = 0; i < totalPages; i++) {
        const prop = (i + 1).toString()
        const start = i * pageSize
        const end = start + pageSize <= records ? start + pageSize : records

        _result.pages[prop as keyof PaginatedByTagsResult<Article>] = filteredDocs.slice(start, end)
      }

      return _result
    })

    return result
  } catch (error) {
    console.error(error)
  }

  return []
}

export { getApi, getContracts, getEnumerable, getPaginated, getPaginatedByTags, getPaginatedByPageNum, getPaginatedByTagsWithPageNum, getApi2 }
