'use client'

import { Table as MantineTable, TableProps as MantineTableProps, TableTheadProps as MantineTheadProps, TableThProps as MantineTableThProps, TableTrProps as MantineTableTrProps, TableTdProps as MantineTableTdProps } from "@mantine/core"

type TableProps = MantineTableProps & {
}

type TableTheadProps = MantineTheadProps & {
}

type TableThProps = MantineTableThProps & {
}

type TableTrProps = MantineTableTrProps & {
}

type TableTdProps = MantineTableTdProps & {
}

export function Table(props: TableProps) {
  return <MantineTable {...props} />
}

export function TableThead(props: TableTheadProps) {
  return <MantineTable.Thead {...props} />
}

export function TableTh(props: TableThProps) {
  return <MantineTable.Th {...props} />
}

export function TableTr(props: TableTrProps) {
  return <MantineTable.Tr {...props} />
}

export function TableTd(props: TableTdProps) {
  return <MantineTable.Td {...props} />
}
