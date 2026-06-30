'use client'

import { Button, Modal, ButtonProps } from "@mantine/core"
import { useDisclosure } from '@mantine/hooks';
import ContactForm from "./ContactForm";
import { isBackendAvailable } from "utils/availability";

type ContactButtonProps = ButtonProps & {
}

export default function ContactButton(props: ContactButtonProps) {
  const [opened, { open, close }] = useDisclosure(false);

  return isBackendAvailable() ? (
    <>
      <Modal opened={opened} onClose={close} title="Contact Me">
        <ContactForm/>
      </Modal>
      <Button onClick={open}>Contact Me</Button>
    </>
  ) : (
    <></>
  )
}
