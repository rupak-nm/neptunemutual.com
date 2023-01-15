const allowed = ['blog', 'pressroom']

const toTagsWithHref = (prefix: string, tags: Tag[] | undefined): TagWithHref[] => {
  const withHrefs: TagWithHref[] = []

  if (tags === undefined || tags === null || tags.length === 0) {
    return withHrefs
  }

  for (const tag of tags) {
    withHrefs.push({
      href: allowed.includes(prefix) ? `/${prefix}/tag/${tag.slug}#${tag.slug}` : undefined,
      ...tag
    })
  }

  return withHrefs
}

export { toTagsWithHref }
