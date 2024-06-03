import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Anchor as MantineAnchor, AnchorProps as MantineAnchorProps } from '@mantine/core'
import { ReactNode } from 'react'

type AnchorProps = NextLinkProps & MantineAnchorProps & {
  children: ReactNode,
}

export default function Anchor(props: AnchorProps) {
  const target = '/' === String(props.href)[0] ? undefined : '_blank'

  return <MantineAnchor component={NextLink} target={target} {...props} >{props.children}</MantineAnchor>
}
