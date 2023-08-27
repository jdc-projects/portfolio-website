import { promises as fs } from 'fs'
import grayMatter from 'gray-matter'

type MarkdownDocument = {
  data: { [key: string]: any; },
  content: string,
}

export async function readLocalFile(filename: string): Promise<MarkdownDocument> {
  const projectContent = await fs.readFile(filename)
  const projectMatter = grayMatter(projectContent)

  return {
    data: projectMatter.data,
    content: projectMatter.content,
  }
}
