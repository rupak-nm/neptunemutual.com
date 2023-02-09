const stripTags = (text: string): string => {
  return text.replace(/(<([^>]+)>)/gi, "");
}

export { stripTags }