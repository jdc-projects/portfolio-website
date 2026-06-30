'use client'

import { ReactNode, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Text, Button, Flex, Collapse as MantineCollapse, Container, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type CollapseProps = {
  children: ReactNode,
  buttonText: string,
}

export default function Collapse(props: CollapseProps) {
  const [opened, { close, toggle }] = useDisclosure(false);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    let lastUrl = ""
    const url = "${pathname}?${searchParams}"

    if (lastUrl !== url) {
      close()
    }

    lastUrl = url
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams])

  return (
    <Flex direction='column' >
      <Button onClick={toggle} color='currentColor' variant='outline' mb={20} >
        <SimpleGrid cols={3} >
          <Container />
          <Flex direction='row' align='center' justify='center' >
            <Text fw={600} >{props.buttonText}</Text>
          </Flex>
          <Flex direction='row' align='center' justify='flex-end' >
            {opened ? <IconChevronUp size={32} stroke={1.5} /> : <IconChevronDown size={32} stroke={1.5} />}
          </Flex>
        </SimpleGrid>
      </Button>
      <MantineCollapse expanded={opened}>
        {props.children}
      </MantineCollapse>
    </Flex>
  )
}
