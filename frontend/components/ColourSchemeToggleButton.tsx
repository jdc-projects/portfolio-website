'use client'

import { useMantineColorScheme, UnstyledButton, Center, UnstyledButtonProps } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react';

type ColourSchemeToggleButtonProps = UnstyledButtonProps & {
}

export default function ColourSchemeToggleButton(props: ColourSchemeToggleButtonProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <UnstyledButton h={50} w={50} mr={5} variant="transparent" color='currentColor' {...props} onClick={() => toggleColorScheme()} >
      <Center>
        {colorScheme === 'dark' ? <IconSun/> : <IconMoon/>}
      </Center>
    </UnstyledButton>
  )
}
