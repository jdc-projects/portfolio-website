'use client'

import { useMantineColorScheme, UnstyledButton, Center, UnstyledButtonProps } from '@mantine/core'
import { IconShadow } from '@tabler/icons-react';

type ColourSchemeToggleButtonProps = UnstyledButtonProps & {
}

export default function ColourSchemeToggleButton(props: ColourSchemeToggleButtonProps) {
  const { toggleColorScheme } = useMantineColorScheme();

  return (
    <UnstyledButton h={50} w={50} mr={5} {...props} onClick={toggleColorScheme} >
      <Center>
        <IconShadow size={32} stroke={1.5} />
      </Center>
    </UnstyledButton>
  )
}
