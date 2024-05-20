
import Image, { ImageProps as ImageProps } from 'components/Image'
import { Stack, Text } from '@mantine/core'

type CaptionedImageeProps = ImageProps & {
  caption: string,
}

export default function CaptionedImage(props: CaptionedImageeProps) {
  return (
    <Stack align='center' gap='xs' mt={20} >
      <Image {...props} alt={props.caption} />
      <Text c='dimmed' >{props.caption}</Text>
    </Stack>
  )
}
