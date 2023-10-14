'use client'

import { Button, Flex, Collapse as MantineCollapse, Container, SimpleGrid } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ReactNode } from "react";
import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";

type CollapseProps = {
  children: ReactNode,
  buttonText: string,
}

export default function Collapse(props: CollapseProps) {
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <Flex direction='column' >
      <Button onClick={toggle} color='currentColor' variant='outline' mb={20} >
        <SimpleGrid cols={3} >
          <Container />
          <Flex direction='row' align='center' justify='center' >
            {props.buttonText}
          </Flex>
          <Flex direction='row' align='center' justify='flex-end' >
            {opened ? <IconChevronUp size={32} stroke={1.5} /> : <IconChevronDown size={32} stroke={1.5} />}
          </Flex>
        </SimpleGrid>
      </Button>
      <MantineCollapse in={opened}>
        {props.children}
      </MantineCollapse>
    </Flex>
  )
}
