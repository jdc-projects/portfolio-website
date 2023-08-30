'use client'

import { useMantineColorScheme, UnstyledButton, Center, UnstyledButtonProps } from '@mantine/core'
import { IconSun, IconMoon } from '@tabler/icons-react';

type ColourSchemeToggleButtonProps = UnstyledButtonProps & {
}

export default function ColourSchemeToggleButton(props: ColourSchemeToggleButtonProps) {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const iconSize = 32
  const iconStroke = 1.5

  return (
    <UnstyledButton h={50} w={50} mr={5} {...props} onClick={() => toggleColorScheme()} >
      <Center>
        {colorScheme === 'dark' ? <IconSun size={iconSize} stroke={iconStroke} /> : <IconMoon size={iconSize} stroke={iconStroke} />}
      </Center>
    </UnstyledButton>
  )
}
