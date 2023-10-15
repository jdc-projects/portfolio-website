import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Anchor as MantineAnchor, AnchorProps as MantineAnchorProps } from '@mantine/core'
import { ReactNode } from 'react'

type AnchorProps = NextLinkProps & MantineAnchorProps & {
  children: ReactNode,
}

export default function Anchor(props: AnchorProps) {
  return <MantineAnchor component={NextLink} {...props} >{props.children}</MantineAnchor>
}
