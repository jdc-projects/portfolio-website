'use client'

import { GridProps as MantineGridProps, GridColProps as MantineGridColProps, Grid as MantineGrid } from '@mantine/core'
import { ReactNode } from 'react'

type GridProps = MantineGridProps & {
}

type GridColProps = MantineGridColProps & {
}

export function Grid(props: GridProps) {
  return <MantineGrid {...props} >{props.children}</MantineGrid>
}

export function GridCol(props: GridColProps) {
  return <MantineGrid.Col {...props} >{props.children}</MantineGrid.Col>
}
