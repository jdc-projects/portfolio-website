'use client'

import { CardProps as MantineCardProps, CardSectionProps as MantinCardSectionProps, Card as MantineCard } from '@mantine/core'
import { ReactNode } from 'react'

type CardProps = MantineCardProps & {
}

type CardSectionProps = MantinCardSectionProps & {
  children: ReactNode,
}

export function Card(props: CardProps) {
  return <MantineCard {...props} >{props.children}</MantineCard>
}

export function CardSection(props: CardSectionProps) {
  return <MantineCard.Section {...props} >{props.children}</MantineCard.Section>
}
