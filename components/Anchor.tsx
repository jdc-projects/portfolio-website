'use client'

import NextLink, { LinkProps as NextLinkProps } from 'next/link'
import { Anchor as MantineAnchor, AnchorProps as MantineAnchorProps } from '@mantine/core'
import { ReactNode } from 'react'

type AnchorProps = NextLinkProps & MantineAnchorProps & {
  children: ReactNode,
  newTab?: boolean,
}

export default function Anchor({ newTab, ...props }: AnchorProps) {
  const href = String(props.href)
  const isInternal = href.startsWith('/') || href.startsWith('mailto:') || href.startsWith('tel:')
  const openInNewTab = newTab ?? !isInternal

  return <MantineAnchor component={NextLink} target={openInNewTab ? '_blank' : undefined} {...props} >{props.children}</MantineAnchor>
}
