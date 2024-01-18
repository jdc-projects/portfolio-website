import type { MDXComponents } from 'mdx/types'
import { Title, Text, Blockquote, Code, List, ListItem, Checkbox, Table, TableThead, TableTh, TableTr, TableTd, Space } from '@mantine/core'
import Image from 'components/Image'
import Anchor from 'components/Anchor'
import { CodeHighlight } from '@mantine/code-highlight'

function MD_p(props: any) {
  const isChildText = (typeof props.children[0]) === 'string'

  return (
    isChildText ?
      <Text mt={5} >{props.children}</Text>
    :
      props.children
  )
}

function MD_li(props: any) {
  const isCheckbox = props.className === 'task-list-item'

  return (
    isCheckbox ?
      <Checkbox defaultChecked={props.checked} label={props.children} ml={10} />
    :
      <ListItem>{props.children}</ListItem>
  )
}

type TableAlign = "center" | "justify" | "left" | "right" | "char" | undefined

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    a: (props: any) => <Anchor href={props.href as string} >{props.children}</Anchor>,
    blockquote: (props: any) => <Blockquote>{props.children}</Blockquote>,
    code: (props: any) => <Code>{props.children}</Code>,
    img: (props: any) => <Image src={props.src as string} alt={props.alt as string} title={props.title} />,
    h1: (props: any) => <Title order={1} >{props.children}</Title>,
    h2: (props: any) => <><Space h='sm' /><Title order={2} >{props.children}</Title></>,
    h3: (props: any) => <><Space h='xs' /><Title order={3} >{props.children}</Title></>,
    h4: (props: any) => <Title order={4} >{props.children}</Title>,
    h5: (props: any) => <Title order={5} >{props.children}</Title>,
    h6: (props: any) => <Title order={6} >{props.children}</Title>,
    p: MD_p,
    pre: (props: any) => <><Space h='xs' /><CodeHighlight code={props.children.props.children} language={props.children.props.className.split("-").at(-1)} /></>,
    em: (props: any) => <Text fs='italic' span={true} >{props.children}</Text>,
    strong: (props: any) => <Text fw={700} span={true} >{props.children}</Text>,
    li: MD_li,
    ol: (props: any) => <><Space h='xs' /><List type='ordered' >{props.children}</List></>,
    ul: (props: any) => <><Space h='xs' /><List type='unordered' >{props.children}</List></>,
    del: (props: any) => <Text td="line-through" span={true} >{props.children}</Text>,
    input: (props: any) => <></>,
    table: (props: any) => <Table mb={10} >{props.children}</Table>,
    td: (props: any) => <TableTd align={props.style?.textAlign as TableAlign} >{props.children}</TableTd>,
    th: (props: any) => <TableTh align={props.style?.textAlign as TableAlign} >{props.children}</TableTh>,
    thead: (props: any) => <TableThead>{props.children}</TableThead>,
    tr: (props: any) => <TableTr>{props.children}</TableTr>,
    ...components,
  }
}
