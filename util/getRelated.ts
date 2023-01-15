const getRelatedPosts = (post: Article, all: Article[], max = 3): Article[] => {
  if (post.tags === null || post.tags === undefined || post.tags.length === 0) {
    return []
  }

  const [tag] = post.tags

  const related = all.filter(x =>
    x.slug !== post.slug && x.tags?.find(y => y.slug === tag.slug)
  )

  return related.slice(0, max)
}

export { getRelatedPosts }
