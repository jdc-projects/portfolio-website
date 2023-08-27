import { Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import Anchor from "components/Anchor";

export default function SocialLinks() {
  return (
    <Flex direction='row' gap='xl' >
      <Anchor href='https://github.com' ><IconBrandGithub size={48} /></Anchor>
      <Anchor href='https://linkedin.com' ><IconBrandLinkedin size={48} /></Anchor>
    </Flex>
  )
}
