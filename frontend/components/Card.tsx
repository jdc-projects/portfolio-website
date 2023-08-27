'use client'

import { CardProps as MantineCardProps, CardSectionProps as MantinCardSectionProps, Card as MantineCard } from '@mantine/core'
import { ReactNode } from 'react'

type CardProps = MantineCardProps & {
}

type CardSectionProps = MantinCardSectionProps & {
}

export function Card(props: CardProps) {
  return <MantineCard {...props} />
}

export function CardSection(props: CardSectionProps) {
  return <MantineCard.Section {...props} />
}
