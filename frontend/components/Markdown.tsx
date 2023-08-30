import { Title, Text, Blockquote, Code, List, ListItem, Checkbox } from '@mantine/core'
import Image from 'components/Image'
import Anchor from 'components/Anchor'
import { Table, TableThead, TableTh, TableTr, TableTd } from 'components/Table'
import { CodeHighlight } from '@mantine/code-highlight'
import ReactMarkdown, { Options, Components as ReactMarkdownComponents } from 'react-markdown'
import remarkGfm from 'remark-gfm'

function MD_code(props: any) {
  const language = props.inline ? undefined: props.className.split("-").at(-1)
  const code = props.children.join('\n')

  return (
    props.inline ?
      <Code>{props.children}</Code>
    :
      <CodeHighlight code={code} language={language} />
  )
}

function MD_p(props: any) {
  const isChildText = (typeof props.children[0]) === 'string'

  return (
    isChildText ?
      <Text >{props.children}</Text>
    :
      props.children
  )
}

function MD_li(props: any) {
  const isCheckbox = props.className === 'task-list-item'

  return (
    isCheckbox ?
      <Checkbox defaultChecked={props.checked} label={props.children} />
    :
      <ListItem>{props.children}</ListItem>
  )
}

type TableAlign = "center" | "justify" | "left" | "right" | "char" | undefined

export type Components = ReactMarkdownComponents

export const defaultComponents: Components = {
  // Allows customizing built-in components, e.g. to add styling.
  a: (props) => <Anchor href={props.href as string} >{props.children}</Anchor>,
  blockquote: (props) => <Blockquote>{props.children}</Blockquote>,
  code: MD_code,
  img: (props) => <Image src={props.src as string} alt={props.alt as string} title={props.title} />,
  h1: (props) => <Title order={1} >{props.children}</Title>,
  h2: (props) => <Title order={2} >{props.children}</Title>,
  h3: (props) => <Title order={3} >{props.children}</Title>,
  h4: (props) => <Title order={4} >{props.children}</Title>,
  h5: (props) => <Title order={5} >{props.children}</Title>,
  h6: (props) => <Title order={6} >{props.children}</Title>,
  p: MD_p,
  em: (props) => <Text fs='italic' span={true} >{props.children}</Text>,
  strong: (props) => <Text fw={700} span={true} >{props.children}</Text>,
  li: MD_li,
  ol: (props) => <List type='ordered' >{props.children}</List>,
  ul: (props) => <List type='unordered' >{props.children}</List>,
  del: (props) => <Text td="line-through" span={true} >{props.children}</Text>,
  input: (props) => <></>,
  table: (props) => <Table>{props.children}</Table>,
  td: (props) => <TableTd align={props.style?.textAlign as TableAlign} >{props.children}</TableTd>,
  th: (props) => <TableTh align={props.style?.textAlign as TableAlign} >{props.children}</TableTh>,
  thead: (props) => <TableThead>{props.children}</TableThead>,
  tr: (props) => <TableTr>{props.children}</TableTr>,
}

type MarkdownProps = Options & {
}

export default function Markdown(props: MarkdownProps) {
  const components = (props.components === undefined) ? defaultComponents : props.components
  const rehypePlugins = (props.rehypePlugins === undefined) ? [remarkGfm] : props.rehypePlugins

  return <ReactMarkdown components={components} rehypePlugins={rehypePlugins} {...props} />
}
