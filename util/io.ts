import fs from 'fs/promises'
import path from 'path'

const ensureDirectory = async (directory: string): Promise<void> => {
  try {
    await fs.access(directory)
  } catch {
    await fs.mkdir(directory, { recursive: true })
  }
}

const emptyDirectory = async (directory: string): Promise<void> => {
  try {
    await fs.rm(directory, { recursive: true })
  } catch {
    console.log('Can not delete directory: %s', directory)
  }

  await ensureDirectory(directory)
}

const ensureFileDirectory = async (file: string): Promise<void> => {
  try {
    const directory = path.dirname(file)
    await ensureDirectory(directory)
  } catch {
    console.log('Could not create directory for the given file: %s', file)
  }
}

const ensureFile = async (file: string, content = '{}'): Promise<void> => {
  try {
    await fs.access(file)
  } catch {
    await ensureDirectory(path.dirname(file))
    await fs.writeFile(file, content)
  }
}

const saveToDisk = async (filePath: string, contents: string): Promise<void> => {
  await ensureFileDirectory(filePath)
  await fs.writeFile(filePath, JSON.stringify(contents, null, 2))
}

const saveToDiskRaw = async (filePath: string, contents: string): Promise<void> => {
  await ensureFileDirectory(filePath)
  await fs.writeFile(filePath, contents)
}

const readFile = async (filePath: string): Promise<string> => {
  const data = await fs.readFile(filePath)
  return data.toString()
}

const findFiles = async (extension: string, directoryName: string, results: string[] = []): Promise<string[]> => {
  const files = await fs.readdir(directoryName, { withFileTypes: true })

  for (const f of files) {
    const fullPath: string = path.join(directoryName, f.name)

    if (f.isDirectory()) {
      await findFiles(extension, fullPath, results)
    } else {
      if (fullPath.split('.').pop() === extension) {
        results.push(fullPath)
      }
    }
  }

  return results
}

const exists = async (filePath: string): Promise<boolean> => {
  try {
    await fs.access(filePath)
    return true
  } catch {
    // swallow this error
  }

  return false
}

export {
  emptyDirectory,
  ensureDirectory,
  ensureFile,
  ensureFileDirectory,
  exists,
  findFiles,
  readFile,
  saveToDisk,
  saveToDiskRaw
}
