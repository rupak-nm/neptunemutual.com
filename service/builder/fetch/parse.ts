import { Api } from '../../../types/enum'

const parseCommunityBlogs = (apiResponse: CommunityAPIResponse): CommunityBlogItem[] => {
  const filteredDocs = apiResponse.topic_list.topics.filter((topic) => {
    return topic.title.toLowerCase().includes('weekly report')
  })

  return filteredDocs.map((topic) => {
    return {
      title: topic.title,
      slug: topic.slug,
      image_url: topic.image_url,
      created_at: topic.created_at
    }
  })
}

export const parseResponse = (responseString: string, identifier: Api) => {
  const parsed: CommunityAPIResponse = JSON.parse(responseString)

  if (identifier === Api.CommunityBlogs) {
    return parseCommunityBlogs(parsed)
  }

  return parsed
}
