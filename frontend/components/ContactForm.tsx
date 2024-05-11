import { Stack, TextInput, Textarea, Button, Space } from '@mantine/core';
import { useForm } from '@mantine/form';

type ContactFormProps = {
}

function tempOnSubmit(name: string, email: string, message: string) {
  console.log(name + "\n" + email + "\n" + message)
}

export default function ContactForm(props: ContactFormProps) {
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      message: '',
    },

    validate: {
      name: (value) => (/^[a-zA-Z ]+$/.test(value) ? null : 'Invalid name, please only use the letters a-z and spaces'),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email, please enter a valid email address'),
      message: (value) => (/^[a-zA-Z ]+$/.test(value) ? null : 'Invalid message, please only use the letters a-z and spaces'),
    },
  });

  return (
    <form onSubmit={form.onSubmit((values) => tempOnSubmit(values.name, values.email, values.message))}>
      <Stack gap='xs' >
        <TextInput withAsterisk label="Name" placeholder="John Smith" {...form.getInputProps('name')} />
        <TextInput withAsterisk label="Email" placeholder="john.smith@email.com" {...form.getInputProps('email')} />
        <Textarea withAsterisk autosize label="Message" placeholder="Type your message here" {...form.getInputProps('message')} />
        <Space h={5} />
        <Button type='submit' >Submit</Button>
      </Stack>
    </form>
  )
}
