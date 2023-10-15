import { Flex } from "@mantine/core";
import { IconBrandGithub, IconBrandGithubFilled, IconBrandLinkedin } from "@tabler/icons-react";
import Anchor from "components/Anchor";

export default function SocialLinks() {
  return (
    <Flex direction='row' gap='xl' >
      <Anchor href='https://github.com/jd-chapman' c='currentColor' ><IconBrandGithub size={48} stroke={1.5} /></Anchor>
      <Anchor href='https://github.com/jdc-projects' c='currentColor' ><IconBrandGithubFilled size={48} stroke={1.5} /></Anchor>
      <Anchor href='https://www.linkedin.com/in/jack-chapman-' c='currentColor' ><IconBrandLinkedin size={48} stroke={1.5} /></Anchor>
    </Flex>
  )
}
