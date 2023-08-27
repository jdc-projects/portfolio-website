'use client'

import { GridProps as MantineGridProps, GridColProps as MantineGridColProps, Grid as MantineGrid } from '@mantine/core'

type GridProps = MantineGridProps & {
}

type GridColProps = MantineGridColProps & {
}

export function Grid(props: GridProps) {
  return <MantineGrid {...props} />
}

export function GridCol(props: GridColProps) {
  return <MantineGrid.Col {...props} />
}
