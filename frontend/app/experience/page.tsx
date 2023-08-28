import Markdown from 'components/Markdown'
import { join } from 'path'
import { fixLocalPath } from 'utils/filepath'
import { readLocalFile } from 'utils/markdown'

export default async function Page() {
  const summary = (await readLocalFile(fixLocalPath(join(__dirname, 'summary.md')))).content

  return (
    <Markdown>{summary}</Markdown>
  )
}
