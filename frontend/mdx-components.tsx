import type { MDXComponents } from 'mdx/types'
import { Title, Text, Anchor, Blockquote, Code, List, ListItem, Image } from '@mantine/core'

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

const MDCode = (props: any) => {
  // className is the language of the code block
  // so if it is undefined, we can assume it's inline
  const isBlock = props.className === undefined ? false : true
  const language = isBlock ? props.className.split("-").at(-1) : undefined;

  return (
    <Code block={isBlock} >
      {props.children}
    </Code>
  )
}

// This file is required to use MDX in `app` directory.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Allows customizing built-in components, e.g. to add styling.
    a: (props) => <Anchor href={props.href} title={props.title} >{props.children}</Anchor>,
    blockquote: (props) => <Blockquote>{props.children}</Blockquote>,
    code: MDCode,
    // this is necessary to make code blocks work properly with Mantine
    pre: (props) => <>{props.children}</>,
    img: (props) => <Image src={props.src} alt={props.alt} title={props.title} />,
    h1: (props) => <Title order={1} >{props.children}</Title>,
    h2: (props) => <Title order={2} >{props.children}</Title>,
    h3: (props) => <Title order={3} >{props.children}</Title>,
    h4: (props) => <Title order={4} >{props.children}</Title>,
    h5: (props) => <Title order={5} >{props.children}</Title>,
    h6: (props) => <Title order={6} >{props.children}</Title>,
    p: (props) => <Text>{props.children}</Text>,
    em: (props) => <Text fs="italic">{props.children}</Text>,
    strong: (props) => <Text fw={700}>{props.children}</Text>,
    li: (props) => <ListItem>{props.children}</ListItem>,
    ol: (props) => <List type='ordered' >{props.children}</List>,
    ul: (props) => <List type='unordered' >{props.children}</List>,
  }
}
