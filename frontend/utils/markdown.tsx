import { Title, Text, Blockquote, Code, List, ListItem } from '@mantine/core'
import Image from 'components/Image'
import Anchor from 'components/Anchor'
import { CodeHighlight } from '@mantine/code-highlight'
import { promises as fs } from 'fs'
import grayMatter from 'gray-matter'
import {Components} from 'react-markdown'

type MarkdownDocument = {
  data: { [key: string]: any; },
  content: string,
}

const MDCode = (props: any) => {
  const language = props.inline ? undefined: props.className.split("-").at(-1)
  const code = props.children.join('\n')

  return (
    props.inline ?
      <Code>{props.children}</Code>
    :
      <CodeHighlight code={code} language={language} />
  )
}

export const defaultComponents: Components = {
  // Allows customizing built-in components, e.g. to add styling.
  a: (props) => <Anchor href={props.href as string} >{props.children}</Anchor>,
  blockquote: (props) => <Blockquote>{props.children}</Blockquote>,
  code: MDCode,
  img: (props) => <Image src={props.src as string} alt={props.alt as string} title={props.title} />,
  h1: (props) => <Title order={1} >{props.children}</Title>,
  h2: (props) => <Title order={2} >{props.children}</Title>,
  h3: (props) => <Title order={3} >{props.children}</Title>,
  h4: (props) => <Title order={4} >{props.children}</Title>,
  h5: (props) => <Title order={5} >{props.children}</Title>,
  h6: (props) => <Title order={6} >{props.children}</Title>,
  p: (props) => <Text>{props.children}</Text>,
  em: (props) => <Text fs='italic' >{props.children}</Text>,
  strong: (props) => <Text fw={700} >{props.children}</Text>,
  li: (props) => <ListItem>{props.children}</ListItem>,
  ol: (props) => <List type='ordered' >{props.children}</List>,
  ul: (props) => <List type='unordered' >{props.children}</List>,
}

export async function readLocalFile(filename: string): Promise<MarkdownDocument> {
  const projectContent = await fs.readFile(filename)
  const projectMatter = grayMatter(projectContent)

  return {
    data: projectMatter.data,
    content: projectMatter.content,
  }
}
