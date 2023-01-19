const fixImagePaths = (html: string = ''): string => {
  const pattern = /src="\/media\//g
  return html.replace(pattern, 'src="https://neptunemutual.com/cdn/')
}

export { fixImagePaths }
