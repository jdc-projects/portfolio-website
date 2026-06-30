import { Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin, IconMail } from "@tabler/icons-react";
import Anchor from "components/Anchor";

export default function SocialLinks() {
  return (
    <Flex direction='row' gap='xl' >
      <Anchor href='https://github.com/jdc-projects' c='currentColor' ><IconBrandGithub size={48} stroke={1.5} /></Anchor>
      <Anchor href='https://www.linkedin.com/in/jack-chapman-' c='currentColor' ><IconBrandLinkedin size={48} stroke={1.5} /></Anchor>
      <Anchor href='mailto: jack.chapman@sky.com' c='currentColor' ><IconMail size={48} stroke={1.5} /></Anchor>
    </Flex>
  )
}
