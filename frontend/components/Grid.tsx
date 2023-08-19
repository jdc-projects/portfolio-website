'use client'

import { GridProps as MantineGridProps, GridColProps as MantineGridColProps, Grid as MantineGrid } from '@mantine/core'
import { ReactNode } from 'react'

type GridProps = MantineGridProps & {
  children: ReactNode,
}

type ColProps = MantineGridColProps & {
  children: ReactNode,
}

export function Grid(props: GridProps) {
  return <MantineGrid {...props} >{props.children}</MantineGrid>
}

export function GridCol(props: ColProps) {
  return <MantineGrid.Col {...props} >{props.children}</MantineGrid.Col>
}
