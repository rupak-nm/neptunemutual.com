import { Api } from "../../../types/enum";

const parseCommunityBlogs = (apiResponse: any): CommunityBlogItem[] => {
  const filteredDocs = apiResponse.topic_list.topics.filter((topic: any) => {
    return topic.title.toLowerCase().includes('weekly report')
  })

  return filteredDocs.map((topic: any) => {
    return {
      title: topic.title,
      slug: topic.slug,
      image_url: topic.image_url,
      created_at: topic.created_at,
    }
  })
}

export const parseResponse = (responseString: any, identifier: Api): any => {
  const parsed = JSON.parse(responseString)

  if (identifier === Api.CommunityBlogs) {
    return parseCommunityBlogs(parsed)
  }

  return parsed
}

